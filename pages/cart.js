import { useContext, useState } from "react";
import CartItem from "../components/cartItem";
import CartContext from "../utils/cart-context";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Input,
  InputBase,
  TextField,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { OpenInNew } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
    float: "right",
  },
  input: {
    width: "80%",
    marginLeft: 10,

    color: theme.palette.primary.dark,
  },
  dialogue: {
    width: 400,
    backgroundColor: "white",
  },
}));

const Cart = () => {
  const { cart, total, addToOrders } = useContext(CartContext);
  const classes = useStyles();

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleName = (event) => {
    const enteredName = event.target.value;
    setName(enteredName);
  };

  return (
    <div style={{ margin: "0 auto", width: 600, padding: 30 }}>
      {cart.length > 0 ? (
        <Card style={{ padding: 20 }}>
          <CardHeader title="Cart" />
          <CardContent>
            <div>
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
          </CardContent>
          <div>
            <Button className={classes.button} onClick={handleOpen}>
              Add to orders
            </Button>
            {/* <Button style={{ float: "right" }}>Edit Cart</Button> */}
          </div>
        </Card>
      ) : (
        <div>Cart is empty</div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.dialogue}>
          <DialogTitle>Complete Order</DialogTitle>
          <DialogContent>
            <TextField
              className={classes.input}
              size="small"
              id="name"
              placeholder="Enter name..."
              value={name}
              onChange={(event) => handleName(event)}
            />
          </DialogContent>

          <DialogActions>
            <Button
              className={classes.button}
              onClick={() => addToOrders(name)}
            >
              Confirm
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default Cart;
