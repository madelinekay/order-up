import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  Chip,
  makeStyles,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { useContext } from "react";
import CartContext from "../utils/cart-context";

const useStyles = makeStyles((theme) => ({
  chipOngoing: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
  chipCompleted: {
    color: theme.palette.ternary.dark,
    backgroundColor: theme.palette.ternary.main,
    border: `1px solid ${theme.palette.ternary.dark}`,
  },
  icons: {
    float: "right",
  },
}));

const Order = (props) => {
  const classes = useStyles();
  const { items, name, timePlaced, total, id, status, timeReady } = props.order;
  const { markOrderComplete, deleteOrder } = useContext(CartContext);
  console.log("total", total);

  const tax = total * 0.065;
  const totalPlusTax = (tax + +total).toFixed(2);

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        title={name}
        subheader={timePlaced}
        action={
          <Chip
            className={
              status === "completed"
                ? classes.chipCompleted
                : classes.chipOngoing
            }
            label={status === "ongoing" ? timeReady : "Completed"}
          />
        }
      />

      <CardContent style={{ flexGrow: 2 }}>
        {items.map((item, index) => (
          <div key={index}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: "bold" }}>{item.name}</div>
              <div>{item.itemPrice}</div>
            </div>
            <ul>
              {item.protein ? <li>{item.protein}</li> : null}
              {item.rice ? <li>{item.rice}</li> : null}
              {item.extras
                ? item.extras.map((extra, index) => (
                    <li key={index}>{extra}</li>
                  ))
                : null}
              {item.stars ? <li>{`${item.stars} stars`}</li> : null}
              {item.notes ? <li>{item.notes}</li> : null}
            </ul>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <div>Tax:</div>
          <div>{tax.toFixed(2)}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 30,
            fontWeight: "bold",
          }}
        >
          <div>Total:</div>
          <div>{totalPlusTax}</div>
        </div>
      </CardContent>
      <div>
        {status === "ongoing" ? (
          <IconButton
            className={classes.icons}
            onClick={() => markOrderComplete(id)}
          >
            <CheckIcon />
          </IconButton>
        ) : (
          <div
            style={{
              display: "inline-block",
              float: "right",
              padding: 12,
              color: "#084",
            }}
          >
            <CheckIcon />
          </div>
        )}

        <IconButton className={classes.icons} onClick={() => deleteOrder(id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default Order;
