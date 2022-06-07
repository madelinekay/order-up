import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, Chip, Icon, IconButton, makeStyles, withStyles } from "@material-ui/core";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useContext, useState } from "react";
import CartContext from "../utils/cart-context";

const useStyles = makeStyles((theme) => ({
  cartItem: {
    padding: 10,
    borderBottom: "solid #dddddd",
    marginBottom: 15,
    '&:last-of-type': {
      borderBottom: 0
    }
  },
  header: {
    fontSize: 5,
  },
  chip: {
    // backgroundColor: theme.palette.primary.light,
    // color: theme.palette.primary.dark,
    // border: `1px solid ${theme.palette.primary.dark}`,
  },
  CardContent: {
    color: "#424242",
    '& li': {
      marginBottom: 15
    },
    '&:last-of-type:after': {
      marginBottom: 0
    }
  },
  icon: {
    color: theme.palette.primary.dark
  }
}))

// const Accordion = withStyles({
//   border: "disabled",
//   color: "red",
//   boxShadow: "disabled"
// })(MuiAccordion);

// const AccordionSummary = withStyles({
//   root: {
//     boxShadow: "none",
//     backgroundColor: 'white',
//     borderBottom: '1px solid rgba(0, 0, 0, .125)',
//     marginBottom: -1,
//     minHeight: 56,
//     '&$expanded': {
//       minHeight: 56,
//     },
//   },
//   content: {
//     boxShadow: "none",
//     '&$expanded': {
//       margin: '12px 0',
//     },
//   },
//   expanded: {},
// })(MuiAccordionSummary);

// const AccordionDetails = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiAccordionDetails);

const CartItem = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const { name, itemPrice, protein, rice, extras, stars, notes, quantity } =
    props.item;

  const { editCartItem } = useContext(CartContext)

  const handleIncrementQuantity = () => {
    editCartItem({ ...props.item, quantity: quantity + 1 }, props.item)
  }

  const handleDecrementQuantity = () => {
    editCartItem({ ...props.item, quantity: quantity - 1 }, props.item)
  }
  return (
    <div className={classes.cartItem}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 20 }}>
        <strong>{name}</strong>
        <div className={classes.chip} style={{ fontSize: 15 }} >{`$${(itemPrice * quantity).toFixed(2)}`} </div>
      </div>

      <div
        className={classes.CardContent}
      >

        {/* {protein || rice || extras || stars || notes ? <strong>Item details:</strong> : null} */}
        <ul>
          {protein ? <li><strong>Protein: </strong>{` ${protein}`}</li> : null}
          {rice ? <li><strong>Rice: </strong>{` ${rice}`}</li> : null}
          {stars ? <li><strong>Spice Level:</strong>{` ${stars} stars`}</li> : null}
          {notes ? <li><strong>Notes: </strong>{` ${notes}`}</li> : null}
          {extras.map((extra) => (
            <li key={extra}><strong>Extras: </strong>{` ${extra}`}</li>
          ))}


        </ul>


      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton disabled={quantity == 1 ? true : false} onClick={handleDecrementQuantity}><IndeterminateCheckBoxIcon /></IconButton>
          <strong>{quantity}</strong>
          <IconButton onClick={handleIncrementQuantity}><AddBoxIcon /></IconButton>
        </div>
        <div>
          <IconButton onClick={props.onOpen} >
            <EditIcon />
          </IconButton>
          <IconButton onClick={props.delete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      {/* <hr /> */}
    </div>
  );
};

export default CartItem;


