import CartContext from "../utils/cart-context";

import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Chip,
  makeStyles,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
  chipOngoing: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.ternary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
  chipCompleted: {
    color: theme.palette.primary.dark,
    // color: "white",
    backgroundColor: theme.palette.ternary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
  icons: {
    float: "right",
  },
  iconCompleted: {
    display: "inline-block",
    float: "right",
    padding: 12,
    color: theme.palette.secondary.light,
  }
}));

const Order = (props) => {
  const classes = useStyles();
  const { items, name, timePlaced, totalPlusTax, tax, id, status, timeReady } = props.order;
  const { markOrderComplete, deleteOrder } = useContext(CartContext);

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
              <div style={{ fontWeight: "bold" }}>{`${item.name}${item.quantity > 1 ? ` X${item.quantity}` : ""}`}</div>
              <div>{`$${item.itemPrice * item.quantity}`}</div>
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
          <div>{`$${tax}`}</div>
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
          <div>{`$${totalPlusTax}`}</div>
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
            className={classes.iconCompleted}
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
