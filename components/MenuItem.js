import ItemDialogForm from "./ItemDialogForm";
import CartContext from "../utils/cart-context";


import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardActions, Chip } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add'; import { useContext } from "react";



const MenuItem = (props) => {

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
              // className={classes.chip}
              label={`$${props.item.price.toFixed(2)}`}
            />
          } />
        <CardContent style={{ flex: 1 }}><ul>
          {props.item.ingredients ? props.item.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>) : null}</ul></CardContent>
        <div><div
          style={{
            display: "inline-block",
            // flex: 0,
            float: "right",
            padding: 12,
            color: "#084",
          }}
        ><Button variant='outlined' color='primary' startIcon={<AddIcon />}>Add</Button></div></div>
      </Card>

    </>
  );
};

export default MenuItem;

