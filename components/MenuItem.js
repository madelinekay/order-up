import ItemDialogForm from "./ItemDialogForm";
import CartContext from "../utils/cart-context";
import theme from "../styles/theme";

import { useState } from "react";
import { makeStyles, Button, Card, CardContent, CardHeader, CardActions, Chip } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useContext } from "react";


const useStyles = makeStyles(() => ({
  button: {
    // color: theme.palette.primary.light,
    // backgroundColor: theme.palette.secondary.main,
    // border: `1px solid ${theme.palette.secondary.main}`,
  },
  chip: {
    // margin: 20,
    // color: theme.palette.primary.dark,
    // border: `1px solid ${theme.palette.secondary.main}`,
  }
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


      <Card onClick={openModal} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <CardHeader title={props.item.name}
          action={
            <Chip
              className={classes.chip}
              label={`$${props.item.price.toFixed(2)}`}
            />
          } />
        <CardContent style={{ flex: 1 }}><ul>
          {props.item.ingredients.map(ingredient => <li>{ingredient}</li>)}</ul></CardContent>
        <div><div
          style={{
            display: "inline-block",
            // flex: 0,
            float: "right",
            padding: 12,
            color: "#084",
          }}
        ><Button className={classes.button}><KeyboardArrowDownIcon /></Button></div></div>
      </Card>

    </>
  );
};

export default MenuItem;

