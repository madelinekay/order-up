import { useContext, useState } from "react";
import CartItem from "../components/CartItem";
import ItemDialogForm from "../components/ItemDialogForm"
import CartContext from "../utils/cart-context";
import Button from "@material-ui/core/Button";
import {
  TextField,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@material-ui/core";

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
    marginBottom: 20,
    color: theme.palette.primary.dark,
  },
  dialogue: {
    width: 400,
    backgroundColor: "white",
    padding: 15,
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  }

}));

const Cart = () => {
  const { cart, total, addToOrders, deleteCartItem, editCartItem } = useContext(CartContext);
  const classes = useStyles();

  let totalWithFees = 0
  if (total < 5) {
    totalWithFees = total + .5;
  } else {
    totalWithFees = total
  }

  const tax = totalWithFees * 0.065;
  const totalPlusTax = (tax + totalWithFees).toFixed(2);

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const [editItem, setEditItem] = useState()

  const openEdit = (item) => setEditItem(item);
  const closeEdit = () => setEditItem(null);

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
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div >Cart</div> <Chip className={classes.chip} label={`$${(total * 0.065 + total).toFixed(2)}`} />
          </div> */}
          <div>
            <div>
              {cart.map((item, index) => (
                <CartItem key={index} item={item} onOpen={() => openEdit(item)} delete={() => deleteCartItem(item)} />
              ))}
            </div>
          </div>
          <div>
            <Button
              type="button"
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

      {editItem ? <ItemDialogForm onAdd={(cartItem, prevItem) => editCartItem(cartItem, prevItem)} onClose={closeEdit} open={!!editItem} item={editItem} /> : null}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.dialogue}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DialogTitle>Complete Order</DialogTitle>
            <Chip className={classes.chip} label={`$${totalPlusTax}`} />
          </div>

          {/* <DialogTitle>Complete Order</DialogTitle> */}
          <form onSubmit={(e) => {
            e.preventDefault()
            addToOrders(name)
          }}>
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
