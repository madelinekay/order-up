import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
  push,
  child,
  remove,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import { SettingsOverscan } from "@material-ui/icons";
import { balance } from "./cart-utils/getTime";

const firebaseConfig = {
  apiKey: "AIzaSyA1oL-kZSAuizXIH5lCiGMJmxBqJ26ZMAk",
  authDomain: "thai-calculator.firebaseapp.com",
  databaseURL: "https://thai-calculator-default-rtdb.firebaseio.com",
  projectId: "thai-calculator",
  storageBucket: "thai-calculator.appspot.com",
  messagingSenderId: "1031090262907",
  appId: "1:1031090262907:web:7c4a5b38650205fc0ee3de",
  measurementId: "G-9ZKH40PXLV",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const ordersRef = ref(database, "recentOrders");

const CartContext = createContext({
  cart: [],
  orders: [],
  total: 0,
  addItem: (item) => {},
  addToOrders: () => {},
  fetchOrders: () => {},
  addToArchive: () => {},
  deleteOrder: () => {},
});

export const CartContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [stoveA, setStoveA] = useState([]);
  const [stoveB, setStoveB] = useState([]);

  const router = useRouter();

  useEffect(() => {
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();

      if (data != undefined || data != null) {
        const orders = Object.entries(data).map(([id, obj]) => ({
          id,
          ...obj,
        }));

        setOrders(orders);
      } else {
        setOrders([]);
      }
    });
  }, []);

  const getTime = (name) => {
    const orderKey = name + Date.now();

    let stoveA = [],
      stoveB = [];
    for (const oldOrder of orders.filter((o) => o.status === "ongoing")) {
      const [orderReadyAt, updatedStoveA, updatedStoveB] = balance(
        stoveA,
        stoveB,
        orderKey,
        oldOrder.items.sort((a, b) => b.time - a.time)
      );
      stoveA = updatedStoveA;
      stoveB = updatedStoveB;
      console.log("stove A & B: ", stoveA, stoveB);
    }

    const newOrder = cart.sort((a, b) => b.time - a.time);
    const [orderReady, balancedStoveA, balancedStoveB] = balance(
      stoveA,
      stoveB,
      orderKey,
      newOrder
    );

    return orderReady;
  };

  const addItem = (item) => {
    setCart((state) => [...state, item]);
    setTotal((prevState) => (prevState += item.itemPrice * item.quantity));
  };

  const addToOrders = async (name) => {
    const timeReadyMilliseconds = getTime(name);
    const timeReady = new Date(timeReadyMilliseconds).toLocaleTimeString();

    const order = {
      items: cart,
      timePlaced: new Date().toLocaleTimeString(
        ([], { hour: "2-digit", minute: "2-digit" })
      ),
      timeReady,
      total,
      name,
      status: "ongoing",
    };

    await push(child(ref(database), "recentOrders"), order);

    setCart([]);
    setTotal(0);

    router.push("/orders");
  };

  const markOrderComplete = (id) => {
    return update(ref(database), {
      [`/recentOrders/${id}/status`]: "completed",
    });
  };

  const addToArchive = async () => {
    await push(child(ref(database), "archivedOrders"), orders);
    await remove(ordersRef);
    router.push("/");
  };

  const deleteOrder = (id) => {
    set(ref(database, `/recentOrders/${id}`), null);
  };

  const contextValue = {
    cart,
    orders,
    total,
    addItem,
    addToOrders,
    markOrderComplete,
    addToArchive,
    deleteOrder,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;

// extras is an array

// onValue = ref + callback
// internally, firebase tracks this via:
// let listerners
// onValue(ref, cb) = {
//   listeners.push([ref, cb])
// }
// onSocketData((data) => { if (data.ref === ref) { cb(data} })
