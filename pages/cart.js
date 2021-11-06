import { useContext, useState } from "react";
import CartItem from "../components/cartItem";
import ItemDialogForm from "../components/itemDialogForm"
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
  Chip,
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
  const { cart, total, addToOrders, deleteCartItem } = useContext(CartContext);
  const classes = useStyles();

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  // const [editOpen, setEditOpen] = useState(false)
  const [editItem, setEditItem] = useState()

  const openEdit = (item) => setEditItem(item);
  const closeEdit = () => setEditItem();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleName = (event) => {
    const enteredName = event.target.value;
    setName(enteredName);
  };

  return (
    <div style={{ margin: "0 auto", width: 600, padding: 30 }}>
      {cart.length > 0 ? (
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Cart</div> <Chip label={`$${total * 0.065 + total}`} />
          </div>
          <div>
            <div>
              {cart.map((item, index) => (
                <CartItem key={index} item={item} onOpen={() => openEdit(item)} delete={() => deleteCartItem(item.id)} />
              ))}
            </div>
          </div>
          <div>
            <Button
              className={classes.button}
              onClick={handleOpen}
              style={{ marginTop: 30 }}
            >
              Add to orders
            </Button>
          </div>
        </div>
      ) : (
        <div>Cart is empty</div>
      )}

      {editItem ? <ItemDialogForm onClose={closeEdit} open={!!editItem} item={editItem} /> : null}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.dialogue}>
          <DialogTitle>Complete Order</DialogTitle>
          <form onSubmit={() => addToOrders(name)}>
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
                type="submit"
                className={classes.button}
              // onClick={() => addToOrders(name)}
              >
                Confirm
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Cart;
