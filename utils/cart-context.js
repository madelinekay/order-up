import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";

const CartContext = createContext({
  cart: [],
  orders: [],
  total: 0,
  addItem: (item) => {},
  addToOrders: () => {},
  fetchOrders: () => {},
});

export const CartContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  //there is a bug where if there are no recent orders mapping of object.entries fails despite state being initialized with empty array

  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    let response = await fetch(
      "https://thai-calculator-default-rtdb.firebaseio.com/recentOrders.json"
    );

    const result = await response.json();

    if (result != undefined || result != null) {
      const orders = Object.entries(result).map(([id, obj]) => ({
        id,
        ...obj,
      }));

      setOrders(orders);
    }

    console.log("fetch orders", orders);
  };

  const getTime = (cartTime) => {
    const ongoingOrders = orders.reduce((acc, order) => {
      if (order.status === "ongoing") {
        return acc.concat(order);
      }
      return acc;
    }, []);
    console.log("ongoingorders", ongoingOrders);

    const ongoingOrdersTime = ongoingOrders.reduce((acc, order) => {
      if (order == ongoingOrders[0]) {
        // check if this comparison is kosher
        return (acc += order.timeReadyMilliseconds - Date.now());
      }
      return acc + order.cartTime;
    }, 0);
    console.log("ongoing time", ongoingOrdersTime);
    const totalTime = cartTime + ongoingOrdersTime;
    console.log("total time", totalTime);
    return totalTime;
  };

  const addItem = (item) => {
    console.log(item);
    console.log("addItem");
    setCart((state) => [...state, item]);
    setTotal((prevState) => (prevState += item.itemPrice));
  };

  const addToOrders = async (name) => {
    // const timeReadyMilliseconds = getTime();
    const cartTime = cart.reduce((acc, item) => {
      if (item.name.includes("clay")) {
        return (acc += 10 * 60000);
      }
      return (acc += 5 * 60000);
    }, 0);
    const timeReadyMilliseconds = getTime(cartTime) + Date.now();
    const timeReady = new Date(timeReadyMilliseconds).toLocaleTimeString();
    // console.log("timeReady", timeReady);
    const taxTotal = total * 0.065 + total;
    let response = await fetch(
      "https://thai-calculator-default-rtdb.firebaseio.com/recentOrders.json",
      {
        method: "POST",
        body: JSON.stringify({
          items: cart,
          timePlaced: new Date().toLocaleTimeString(
            ([], { hour: "2-digit", minute: "2-digit" })
          ),
          time: Date.now(),
          cartTime,
          timeReady,
          timeReadyMilliseconds,
          total,
          taxTotal,
          name,
          status: "ongoing",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    fetchOrders();
    router.push("/orders");
    setCart([]);
    setTotal(0);
  };

  const markOrderComplete = async (id) => {
    let response = await fetch(
      `https://thai-calculator-default-rtdb.firebaseio.com/recentOrders/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: "completed",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    fetchOrders();
  };

  const contextValue = {
    cart,
    orders,
    total,
    addItem,
    addToOrders,
    markOrderComplete,
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
