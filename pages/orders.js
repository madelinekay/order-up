import { useEffect, useContext, useState } from "react";
import Order from "../components/order";
import CartContext from "../utils/cart-context";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async function init() {
      let response = await fetch(
        "https://thai-calculator-default-rtdb.firebaseio.com/orders.json"
      );

      const responseJSON = await response.json();
      setOrders(Object.values(responseJSON));
    })();
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <Order key={order.date} order={order} />
      ))}
    </div>
  );
};

export default Orders;
