import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import { getDatabase, ref, setTotal } from "firebase/database";

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
  };

  const getTime = () => {
    const ordersDict = cart.reduce((acc, item) => {
      if (item.time == 0) {
        return acc;
      }
      if (acc[item.time] >= 1) {
        acc[item.time]++;
        return acc;
      }
      acc[item.time] = 1;
      return acc;
    }, {});

    let remainders = [];
    const evenCartTime = Object.keys(ordersDict).reduce((acc, key) => {
      if (ordersDict[key] % 2 == 0) {
        return (acc += (ordersDict[key] / 2) * +key * 60000);
      }

      acc += Math.floor(ordersDict[key] / 2) * +key * 60000;
      remainders.push(+key);
      return acc;
    }, 0);

    const ongoingOrders = orders.reduce((acc, order) => {
      if (order.status === "ongoing") {
        return acc.concat(order);
      }
      return acc;
    }, []);

    // const remaindersTime = remainders
    //   .sort()
    //   .filter((_, index) => index % 2 === 0)
    //   .reduce((time, remainder) => {
    //       for (let i = 0; i < remainders.length; i += 2) {
    //         if (remainders[i + 1]) {
    //           return time += remainders[i] * 60000;
    //         }
    //         orderRemainderTime = remainders[i] * 60000;
    //         return time += remainders[i] * 60000;
    //       }
    //       return time;

    //   }, 0);

    //bring back the final remainder time, needs to be in the database for function to work
    remainders.sort();
    let remaindersTime = 0;
    let finalRemainderTime = null;
    let timeOff = 0;
    const calculateRemaindersTime = async () => {
      for (let i = 0; i < remainders.length; i += 2) {
        if (remainders[i + 1]) {
          console.log("i", i);
          console.log("remainders[i]", remainders[i]);
          remaindersTime += remainders[i] * 60000;
        } else if (!remainders[i + 1] && ongoingOrders.length > 0) {
          for (let order of ongoingOrders) {
            //also should loop backwards so orders closer together are handled first
            if (order.finalRemainderTime) {
              console.log(
                "order.finalRemainderTime",
                order.finalRemainderTime,
                order
              );
              timeOff = remainders[i] * 60000 - order.finalRemainderTime;

              let patched = await fetch(
                `https://thai-calculator-default-rtdb.firebaseio.com/recentOrders/${order.id}.json`,
                {
                  method: "PATCH",
                  body: JSON.stringify({ finalRemainderTime: undefined }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log("patched", patched);
              if (timeOff < 0) {
                console.log("timeOff <0");
                timeOff = 0;
              }
              remaindersTime + timeOff;
            }
          }
        } else {
          finalRemainderTime = remainders[i] * 60000;
          console.log("finalRemainderTime", finalRemainderTime);
          remaindersTime += finalRemainderTime;
        }
      }
    };
    calculateRemaindersTime();

    const cartTime = evenCartTime + remaindersTime;
    // + remaindersTime() + orderRemainderTime;

    const ongoingOrdersTime = ongoingOrders.reduce((acc, order) => {
      if (order.id == ongoingOrders[ongoingOrders.length - 1].id) {
        console.log("order", order);
        // check if this comparison is kosher, check that ongoing orders 0 is the newest order
        let ongoingOrderTime = order.timeReadyMilliseconds - Date.now();
        if (ongoingOrderTime < 0) {
          ongoingOrderTime = 0;
        }
        return (acc += ongoingOrderTime);
      }
      return acc + order.cartTime;
    }, 0);

    const totalTime = cartTime + ongoingOrdersTime;

    console.log("ordersDict", ordersDict);
    console.log("evenCartTime", evenCartTime);
    console.log("remainders", remainders);
    console.log("remaindersTime", remaindersTime);
    console.log("finalRemainderTime", finalRemainderTime);
    console.log("ongoingOrdersTime", ongoingOrdersTime);
    console.log("cartTime", cartTime);
    console.log("totalTime", totalTime);

    // return { totalTime, orderRemainderTime };
    return { totalTime, cartTime, finalRemainderTime };
  };

  const addItem = (item) => {
    setCart((state) => [...state, item]);
    setTotal((prevState) => (prevState += item.itemPrice));
  };

  const addToOrders = async (name) => {
    const database = getDatabase();

    const { totalTime, cartTime, finalRemainderTime } = getTime();

    const timeReadyMilliseconds = totalTime + Date.now();
    const timeReady = new Date(timeReadyMilliseconds).toLocaleTimeString();

    const taxTotal = total * 0.065 + total;

    set(ref(db, "orders"), {
      items: cart,
      timePlaced: new Date().toLocaleTimeString(
        ([], { hour: "2-digit", minute: "2-digit" })
      ),
      time: Date.now(),
      timeReady,
      timeReadyMilliseconds,
      total,
      taxTotal,
      name,
      status: "ongoing",
      cartTime,
      finalRemainderTime,
    });

    const ordersRef = ref(database, "/orders");

    //

    // const { totalTime, cartTime, finalRemainderTime } = getTime();

    // const timeReadyMilliseconds = totalTime + Date.now();
    // const timeReady = new Date(timeReadyMilliseconds).toLocaleTimeString();

    // const taxTotal = total * 0.065 + total;
    // let response = await fetch(
    //   "https://thai-calculator-default-rtdb.firebaseio.com/recentOrders.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       items: cart,
    //       timePlaced: new Date().toLocaleTimeString(
    //         ([], { hour: "2-digit", minute: "2-digit" })
    //       ),
    //       time: Date.now(),
    //       timeReady,
    //       timeReadyMilliseconds,
    //       total,
    //       taxTotal,
    //       name,
    //       status: "ongoing",
    //       cartTime,
    //       finalRemainderTime,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

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
