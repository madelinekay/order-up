import { Button } from "@material-ui/core";
import { useEffect, useContext, useState } from "react";
import Order from "../components/order";
import CartContext from "../utils/cart-context";

const Orders = () => {
  const { orders, fetchOrders } = useContext(CartContext);

  const addToArchive = async () => {
    let response = await fetch(
      "https://thai-calculator-default-rtdb.firebaseio.com/archivedOrders.json",
      {
        method: "POST",
        body: JSON.stringify({
          orders,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
      <Button onClick={addToArchive}>End shift</Button>
      <Button onClick={fetchOrders}>Refresh orders</Button>
    </div>
  );
};

export default Orders;
