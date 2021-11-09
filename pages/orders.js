import { Button, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import Order from "../components/OrderItem";
import CartContext from "../utils/cart-context";


const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
  grid: {
    padding: 30,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    ["@media (max-width: 769px)"]: {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    gridTemplateRows: "repeat(auto-fill, 1fr)",
    gridGap: 20,
  }
}));

const Orders = () => {
  const { orders, addToArchive } = useContext(CartContext);
  const classes = useStyles();

  const sortedOrders = orders.sort((a, b) => {
    return b.timePlacedMilliseconds - a.timePlacedMilliseconds;
  });

  return (
    <div style={{ margin: "0 auto", maxWidth: 1200 }}>
      <div
        className={classes.grid}
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
