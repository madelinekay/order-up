import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useContext, useState } from "react";
import Order from "../components/order";
import CartContext from "../utils/cart-context";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
}));

const Orders = () => {
  const { orders, fetchOrders } = useContext(CartContext);
  const classes = useStyles();

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

  const sortedOrders = orders.sort((a, b) => {
    console.log(a.time);
    return b.time - a.time;
  });

  return (
    <div style={{ margin: "0 auto", width: 1200 }}>
      <div
        style={{
          padding: 30,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(auto-fill, 1fr)",
          gridGap: 20,
        }}
      >
        {sortedOrders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className={classes.button}
          style={{
            marginRight: 30,
          }}
          onClick={addToArchive}
        >
          End Shift / Archive Orders
        </Button>
      </div>
    </div>
  );
};

export default Orders;
