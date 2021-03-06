import CartContext from "../utils/cart-context";

import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Chip,
  makeStyles,
  Tooltip,
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
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.secondary.dark}`,
  },
  icons: {
    float: "right",
  },
  iconCompleted: {
    display: "inline-block",
    float: "right",
    padding: 12,
    // color: "#81c784",
    color: theme.palette.secondary.dark,

  }
}));

const Order = (props) => {
  const classes = useStyles();
  const { items, name, timePlaced, totalPlusTax, tax, id, status, timeReady } = props.order;
  const { markOrderComplete, deleteOrder } = useContext(CartContext);

  return (
    <Card
      variant="outlined"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 20
      }}
    >
      {/* <CardHeader
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
      /> */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ lineHeight: 1.6 }}>
          <div style={{ fontSize: 24 }}>{name}</div>
          <div style={{ fontSize: 16, color: "#747474" }}>{timePlaced}</div>
        </div>
        <Chip
          className={
            status === "completed"
              ? classes.chipCompleted
              : classes.chipOngoing
          }
          label={status === "ongoing" ? timeReady : "Completed"}
        />
      </div>
      <CardContent style={{ flexGrow: 2, }}>
        {/* <div > */}
        {items.map((item, index) => (
          <div key={index}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: "bold" }}>{`${item.name}${item.quantity > 1 ? ` (${item.quantity})` : ""}`}</div>
              <div>{`$${(item.itemPrice * item.quantity).toFixed(2)}`}</div>
            </div>
            <ul>
              {item.protein ? <li>{item.protein}</li> : null}
              {item.rice ? <li>{`${item.rice} rice`}</li> : null}
              {item.stars ? <li>{`${item.stars} stars`}</li> : null}
              {item.extras
                ? item.extras.map((extra, index) => (
                  <li key={index}>{extra}</li>
                ))
                : null}
              {item.notes ? <li>{item.notes}</li> : null}
            </ul>
          </div>
        ))}
        {/* </div> */}

        {/* <div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 30,
          }}>
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
        {/* </div> */}
      </CardContent>
      <div>
        {status === "ongoing" ? (
          <IconButton
            className={classes.icons}
            onClick={() => markOrderComplete(id)}
          >     <Tooltip title="Mark complete">
              <CheckIcon />
            </Tooltip>
          </IconButton>
        ) : (
          <div
            className={classes.iconCompleted}
          >

            <CheckIcon />

          </div>
        )}
        <IconButton className={classes.icons} onClick={() => deleteOrder(id)}>
          <Tooltip title="Delete">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      </div>
    </Card>
  );
};

export default Order;
