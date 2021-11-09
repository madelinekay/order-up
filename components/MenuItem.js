import ItemDialogForm from "./ItemDialogForm";
import CartContext from "../utils/cart-context";
import theme from "../styles/theme";

import { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { useContext } from "react";


const useStyles = makeStyles(() => ({
  button: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
}));

const MenuItem = (props) => {
  const classes = useStyles();
  const { addItem } = useContext(CartContext)
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <ItemDialogForm open={open} onAdd={addItem}
        onClose={handleClose} item={props.item}
        style={{ margin: "auto", width: 550 }} />

      <Button className={classes.button} onClick={openModal}>
        <h2>{props.item.name}</h2>
      </Button>
    </>
  );
};

export default MenuItem;

