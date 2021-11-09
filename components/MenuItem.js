import ItemDialogForm from "./ItemDialogForm";

import { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import CartContext from "../utils/cart-context";
import { useContext } from "react";
import theme from "../styles/theme";

const useStyles = makeStyles(() => ({
  button: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
}));

const MenuItem = (props) => {
  const { addItem } = useContext(CartContext)
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

// const optionGroupOutput = {
//   rice: [
//     { name: "White rice", type: "rice", modifier: 0 },
//     { name: "Brown rice", type: "rice", modifier: 1 },
//   ],
//   extras: [{ name: "Extra meat", type: "extras", modifier: 2 }],
// };
