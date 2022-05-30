import CartItem from "../components/CartItem";
import ItemDialogForm from "../components/ItemDialogForm"
import CartContext from "../utils/cart-context";
import { calculateDuration } from "../utils/cart-utils/balance-stoves";

import { useContext, useState } from "react";
import { DateTime } from "luxon";
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
import AddIcon from '@material-ui/icons/Add';



const useStyles = makeStyles((theme) => ({
  button: {
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
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  }

}));

const Cart = () => {
  const { cart, latestOrderReadyTime, addToOrders, deleteCartItem, editCartItem, calculateTotal } = useContext(CartContext);
  const classes = useStyles();

  const [_tax, totalPlusTax] = calculateTotal();

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
    const enteredTime = event.target.value;
    console.log('enteredTime', enteredTime);
    setTime(enteredTime)
  }



  const individualItems = cart
    .map((item) => new Array(item.quantity).fill(item))
    .reduce((acc, arr) => [...acc, ...arr], [])
    .sort((a, b) => b.time - a.time);

  // TODO: this is broken and used for scheduling
  const scheduledOrderDuration = calculateDuration([], individualItems)
  //or just reduce, might be cleaner

  const orderDuration = scheduledOrderDuration * 60_000 + Date.now();

  //write a separate function for this 

  const placeholder = latestOrderReadyTime > Date.now() ? DateTime.fromMillis(latestOrderReadyTime + orderDuration).toISO().slice(0, 16) : DateTime.now().toISO().slice(0, 16);

  return (

    <div style={{ margin: "0 auto", width: 600, padding: 30, marginTop: 75 }}>
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
              startIcon={<AddIcon />}
              type="button"
              variant="contained"
              color="primary"
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
            let scheduledTimeMilliseconds = null;
            if (time) {
              scheduledTimeMilliseconds = DateTime.fromISO(time).toMillis();
              console.log('scheduledTimeMilliseconds', scheduledTimeMilliseconds);
            }
            addToOrders(name, scheduledTimeMilliseconds)
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
                variant="contained"
                color="primary"
                type="submit"
              // className={classes.button}
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
