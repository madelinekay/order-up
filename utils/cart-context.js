import { calculateDuration } from "./cart-utils/balance-stoves";

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
import { number } from "yup/lib/locale";
import { boolean } from "yup";

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
  open: boolean,
  latestOrderReadyTime: number,
  addItem: (item) => { },
  addToOrders: () => { },
  fetchOrders: () => { },
  addToArchive: () => { },
  deleteOrder: () => { },
  deleteCartItem: () => { },
  editCartItem: () => { },
  calculateTotal: () => { },
  closeSnackbar: () => { }
});

export const CartContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [latestOrderReadyTime, setLatestOrderReadyTime] = useState([0])
  const [open, setOpen] = useState(false)
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

  const closeSnackbar = () => {
    setOpen(false)
  }

  const deleteCartItem = (item) => {
    const itemIndex = cart.findIndex(i => i.id === item.id)
    const cartCopy = [...cart];
    cartCopy.splice(itemIndex, 1);
    setCart(cartCopy)
  }

  const editCartItem = (item, prevItem) => {
    const itemIndex = cart.findIndex(i => i.id === item.id)
    const cartCopy = [...cart]

    console.log("item", item, item.quantity)
    cartCopy.splice(itemIndex, 1, item)
    setCart(cartCopy)
  }

  const calculateReadyTime = (name, scheduledTime) => {
    const sortedExistingOrders = orders.filter((o) => o.status === "ongoing").sort((a, b) => {
      return a.timePlacedMilliseconds - b.timePlacedMilliseconds;
    })

    const existingOrderItems = sortedExistingOrders.map(order => order.items);
    const currentOrder = cart
      .map((item) => new Array(item.quantity).fill(item))
      .reduce((acc, arr) => [...acc, ...arr], [])
      .sort((a, b) => b.time - a.time);

    const orderDurationMinutes = calculateDuration(
      existingOrderItems,
      currentOrder,
    );

    let orderDurationAdjustment = 0
    if (sortedExistingOrders.length > 0) {
      orderDurationAdjustment = sortedExistingOrders[0].timeReadyMilliseconds - Date.now()
      if (orderDurationAdjustment < 0) {
        orderDurationAdjustment = 0;
      }
    }

    const orderReadyTimeMilliseconds = (Date.now() + orderDurationMinutes * 60_000) - orderDurationAdjustment
    const orderReadyTimeString = new Date(orderReadyTimeMilliseconds).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    setLatestOrderReadyTime(orderReadyTimeMilliseconds);
    return [orderReadyTimeMilliseconds, orderReadyTimeString];
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + (item.itemPrice * item.quantity), 0)
    let totalWithFees = 0

    if (total < 5) {
      totalWithFees = total + .5;
    } else {
      totalWithFees = total
    }

    const tax = totalWithFees * 0.094;
    const totalPlusTax = (tax + totalWithFees).toFixed(2);
    return [tax, totalPlusTax]
  }

  const addItem = (item) => {
    setCart((state) => [...state, item]);
    setOpen(true)
  };

  const addToOrders = async (name, scheduledTime) => {
    const [timeReadyMilliseconds, timeReady] = calculateReadyTime(name, scheduledTime);
    const [tax, totalPlusTax] = calculateTotal();
    const order = {
      items: cart,
      timePlaced: new Date().toLocaleTimeString(
        [], { hour: "2-digit", minute: "2-digit" }
      ),
      timePlacedMilliseconds: Date.now(),
      timeReady,
      timeReadyMilliseconds,
      tax: tax.toFixed(2),
      totalPlusTax,
      name,
      status: "ongoing",
    };

    await push(child(ref(database), "recentOrders"), order);
    setCart([]);
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
    router.push("/orders");
  };

  const deleteOrder = (id) => {
    set(ref(database, `/recentOrders/${id}`), null);
  };

  const contextValue = {
    cart,
    orders,
    open,
    latestOrderReadyTime,
    addItem,
    addToOrders,
    markOrderComplete,
    addToArchive,
    deleteOrder,
    deleteCartItem,
    editCartItem,
    calculateTotal,
    closeSnackbar
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
