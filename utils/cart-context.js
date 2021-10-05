import { useState, createContext } from "react";
import { useRouter } from "next/router";

const CartContext = createContext({
  cart: [],
  total: 0,
  time: "",
  addItem: (item) => {},
  addToOrders: () => {},
});

export const CartContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState();

  const router = useRouter();

  const addItem = (item) => {
    console.log(item);
    console.log("addItem");
    setCart((state) => [...state, item]);
    setTotal((prevState) => (prevState += item.itemPrice));
  };

  const addToOrders = async (name) => {
    console.log("clear");
    const time = new Date().toLocaleTimeString();
    setTime(time);
    setTotal((prevState) => prevState * 0.065 + prevState);

    let response = await fetch(
      "https://thai-calculator-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          items: cart,
          time: time,
          total: total,
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCart([]);
    setTotal(0);
    router.push("/orders");
  };

  const contextValue = {
    cart,
    total,
    time,
    addItem,
    addToOrders,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;

// extras is an array
