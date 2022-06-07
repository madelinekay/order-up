import CartItem from "../components/CartItem";
import ItemDialogForm from "../components/ItemDialogForm"
import CartContext from "../utils/cart-context";
import { calculateDuration } from "../utils/cart-utils/balance-stoves";

import { useContext, useState } from "react";
import Link from "next/link";
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
  Paper,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  Typography,
  Alert,
  IconButton
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { TheatersOutlined } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  button: {
    float: "right",
    marginBottom: 75,
  },
  orderName: {
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.dark,
    backgroundColor: "white",
    padding: 8,
    display: 'block',
    flex: 1,
    marginRight: 15
    // borderTopRightRadius: 0,
    // borderBottomRightRadius: 0
  },
  orderPlaceButton: {
    // borderTopLeftRadius: 0,
    // borderBottomLeftRadius: 0
    // border: `solid black`,
  },
  orderSummary: {
    width: 400,
    backgroundColor: "#e8eaf6",
    padding: 20,
    marginTop: 20
  },
  chip: {
    backgroundColor: theme.palette.ternary.dark,
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
  span: {
    textDecoration: "underline",
    '&:hover': { cursor: "pointer" }
  },
  cart: {
    padding: 20,
    width: 600,
    // backgroundColor: "#f6f6f6",
    // color: theme.palette.primary.dark,
    border: `solid #dddddd`,
    marginTop: 20,
  },
  iconButton: {
    color: theme.palette.primary.main,
    backgroundColor: "white"
  }
}));

const Cart = () => {
  const { cart, latestOrderReadyTime, addToOrders, deleteCartItem, editCartItem, calculateTotal } = useContext(CartContext);
  const classes = useStyles();


  const [tax, totalPlusTax] = calculateTotal();

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

  // TODO: rewrite scheduling to be used with new algorithm
  const scheduledOrderDuration = calculateDuration([], individualItems)
  //or just reduce, might be cleaner

  const orderDuration = scheduledOrderDuration * 60_000 + Date.now();
  const placeholder = latestOrderReadyTime > Date.now() ? DateTime.fromMillis(latestOrderReadyTime + orderDuration).toISO().slice(0, 16) : DateTime.now().toISO().slice(0, 16);

  // bg = f6f6f6, border: = dddddd

  return (
    <div style={{ margin: "0 auto", padding: 30, marginTop: 30, }}>

      <div style={{ width: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 50, }}>
          {cart.length > 0 ? (
            <>
              <div>
                <strong style={{ fontSize: 20 }}>{`Cart (${cart.length} item${cart.length > 1 ? "s" : ""})`}</strong>
                <Paper className={classes.cart} variant="outlined">

                  {cart.map((item, index) => (
                    <CartItem key={index} item={item} cart={cart} onOpen={() => openEdit(item)} delete={() => deleteCartItem(item)} />
                  ))}


                </Paper>
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                  <Link href="/">
                    <Button className={classes.IconButton} startIcon={<AddIcon />} color="primary">Add more items</Button>
                  </Link>
                </div>
              </div>
              <div>
                <strong style={{ fontSize: 20 }}>&nbsp;</strong>
                <Paper variant="outlined" className={classes.orderSummary}>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    let scheduledTimeMilliseconds = null;
                    if (time) {
                      scheduledTimeMilliseconds = DateTime.fromISO(time).toMillis();
                      console.log('scheduledTimeMilliseconds', scheduledTimeMilliseconds);
                    }
                    addToOrders(name, scheduledTimeMilliseconds)
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <strong style={{ fontSize: 20 }}>Order Summary</strong>
                      {/* <Link href="/cart">
                        <Button className={classes.IconButton} startIcon={<AddIcon />} color="primary" style={{ backgroundColor: "white" }}>Add more items</Button>
                      </Link> */}
                    </div>
                    <ul style={{ lineHeight: 2 }}>
                      <li><strong>Tax: </strong>{` $${tax.toFixed(2)}`}</li>
                      <li> <strong>Total: </strong>{` $${totalPlusTax}`}</li>
                    </ul>

                    <div style={{ display: 'flex' }}>

                      <TextField
                        className={classes.orderName}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        id="name"
                        placeholder="Enter name..."
                        value={name}
                        onChange={(event) => handleName(event)}
                      />
                      <Button
                        className={classes.orderPlaceButton}
                        variant="contained"
                        color="primary"
                        type="submit"
                        disableElevation
                      >
                        Place Order
                      </Button>
                    </div>
                  </form>
                </Paper>
              </div>
            </>
          ) : (
            <div>Cart is empty, return to <Link href="/">
              <span className={classes.span}>
                menu
              </span>
            </Link> to add items
            </div>
          )}
        </div>
      </div>

      {editItem ?
        <ItemDialogForm
          onAdd={(cartItem, prevItem) => editCartItem(cartItem, prevItem)}
          onClose={closeEdit}
          open={!!editItem}
          item={editItem} />
        : null}
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
              {/* <div>
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
              </div> */}
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
