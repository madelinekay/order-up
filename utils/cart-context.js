import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";

const CartContext = createContext({
  cart: [],
  orders: [],
  total: 0,
  time: "",
  addItem: (item) => {},
  addToOrders: () => {},
  fetchOrders: () => {},
});

export const CartContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState();
  const [orders, setOrders] = useState([]);

  const router = useRouter();

  const fetchOrders = async () => {
    let response = await fetch(
      "https://thai-calculator-default-rtdb.firebaseio.com/recentOrders.json"
    );

    const result = await response.json();
    const orders = Object.entries(result).map(([id, obj]) => ({
      id,
      ...obj,
    }));
    setOrders(orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getTime = () => {
    const cartTime = cart.reduce((acc, item) => {
      // find category, add time to acc
    }, 0);
    const ongoingOrdersTime = orders.reduce((acc, order) => {
      if (order.status === "ongoing") {
        const ongoingOrderTime = order.timeReady - Date.now();
        acc += ongoingOrderTime;
      }
    }, 0);

    return cartTime + ongoingOrdersTime;
  };

  const addItem = (item) => {
    console.log(item);
    console.log("addItem");
    setCart((state) => [...state, item]);
    setTotal((prevState) => (prevState += item.itemPrice));
  };

  const addToOrders = async (name) => {
    const timePlaced = new Date().toLocaleTimeString();
    setTime(time);
    setTotal((prevState) => prevState * 0.065 + prevState);

    const timeReady = (getTime() + Date.now()).toLocaleTimeString;

    let response = await fetch(
      "https://thai-calculator-default-rtdb.firebaseio.com/recentOrders.json",
      {
        method: "POST",
        body: JSON.stringify({
          items: cart,
          timePlaced,
          timeReady,
          total,
          name,
          status: "ongoing",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCart([]);
    setTotal(0);
    router.push("/orders");
    fetchOrders();
  };

  // const markOrderComplete = (name) => {
  //   const newOrders = orders.map((order) => {
  //     if (order.name === name) {
  //       order.status === "complete";
  //     }
  //   });
  //   console.log(newOrders);
  //   setOrders(newOrders);
  // };

  const contextValue = {
    cart,
    orders,
    total,
    time,
    addItem,
    addToOrders,
    fetchOrders,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;

// extras is an array
