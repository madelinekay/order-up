import ItemDialogForm from "./ItemDialogForm";
import CartContext from "../utils/cart-context";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardActions, Chip, makeStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add'; import { useContext } from "react";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  chip: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.ternary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
  alert: {
    // margin: 20,
    width: 190,
    float: "left",
    // marginRight: 55,
    // position: "absolute",
    // zIndex: 2,
    // transform: "Translate(80%, 100%)",
  },
  added: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
  },
  span: {
    textDecoration: "underline",
    '&:hover': { cursor: "pointer" }
  }
}))

const MenuItem = (props) => {
  const classes = useStyles()

  const { addItem, cart } = useContext(CartContext)
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ItemDialogForm open={open} onAdd={addItem} openAlert={props.openAlert}
        onClose={handleClose} item={props.item}
        style={{ margin: "auto", width: 550 }} />
      <Card onClick={openModal} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* <CardHeader title={props.item.name}
          action={<Chip className={classes.chip} label={`$${props.item.price.toFixed(2)}`} />} /> */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: 20, fontSize: 20
        }}>
          <strong>{props.item.name}</strong>
          <Chip className={classes.chip} label={`$${props.item.price.toFixed(2)}`} />
        </header>
        <CardContent style={{ flex: 1 }}>
          <ul>
            {props.item.ingredients ? props.item.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>) : null}
          </ul>
        </CardContent>
        <div>
          <div
            style={{
              display: "inline-block",
              float: "right",
              padding: 12,
              color: "#084",
            }}
          >

            <Button variant='outlined' color='primary' startIcon={<AddIcon />}>Add</Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default MenuItem;

