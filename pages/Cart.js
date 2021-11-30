import CartItem from "../components/CartItem";
import ItemDialogForm from "../components/ItemDialogForm"
import CartContext from "../utils/cart-context";

import { useContext, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  TextField,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Button,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  const { cart, latestOrderReadyTime, addToOrders, deleteCartItem, editCartItem, calculateTotal } = useContext(CartContext);
  const classes = useStyles();

  console.log('latestOrderReadyTime', latestOrderReadyTime);
  console.log('Date.now()', Date.now());
  console.log('latestOrderReadyTime > Date.now()', latestOrderReadyTime > Date.now());

  const { totalPlusTax } = calculateTotal();

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState(false)
  const [time, setTime] = useState(null)

  // let schema = yup.object().shape({
  //   name: yup.string().required(),
  //   time: yup.date()
  // })

  const [editItem, setEditItem] = useState()

  const openEdit = (item) => setEditItem(item);
  const closeEdit = () => setEditItem(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleName = (event) => {
    const enteredName = event.target.value;
    setName(enteredName);
  };

  const handleTime = (event) => {
    const enteredTime = event.target.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).slice(0, 5);
    setTime(enteredTime)
  }

  const placeholder = latestOrderReadyTime > Date.now() ? new Date(latestOrderReadyTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).slice(0, 5) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).slice(0, 5)
  console.log('placeholder', placeholder);

  return (
    <div style={{ margin: "0 auto", width: 600, padding: 30 }}>
      {cart.length > 0 ? (
        <div style={{ padding: 20 }}>
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

          <form onSubmit={(e) => {
            e.preventDefault()
            addToOrders(name, time)
          }}>
            <DialogContent>
              <TextField
                className={classes.input}
                InputProps={{ disableUnderline: true }}
                size="small"
                id="name"
                placeholder="Enter name..."
                value={name}
                onChange={(event) => handleName(event)}
              />
              <div>
                {schedule ? (
                  <TextField
                    type="datetime-local"
                    InputProps={{ disableUnderline: true }}
                    className={classes.input}
                    size="small"
                    value={time ? time : placeholder}
                    onChange={handleTime}
                  />
                ) : (
                  <Button
                    style={{ marginRight: 20 }}
                    onClick={() => setSchedule(true)}
                  >
                    <div style={{ marginRight: 30 }}>Schedule pickup</div>
                    <ExpandMoreIcon />
                  </Button>
                )}
              </div>
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    defaultValue={`${new Date}`}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    defaultValue={placeholder}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider> */}
            </DialogContent>

            <DialogActions>
              <Button
                type="submit"
                className={classes.button}
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