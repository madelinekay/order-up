import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, Chip, IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: 5,
  },
  chip: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  }
}))

const CartItem = (props) => {
  const classes = useStyles();
  const { name, itemPrice, protein, rice, extras, stars, notes, quantity } =
    props.item;

  return (
    <Card style={{ marginBottom: 30 }}>
      <CardHeader
        className={classes.header}
        title={`${name}${quantity > 1 ? ` X${quantity}` : ""}`}
        action={<Chip className={classes.chip} label={`$${(itemPrice * quantity).toFixed(2)}`} style={{ fontSize: 15 }} />}
      />

      <CardContent>
        <ul>
          {protein ? <li>{protein}</li> : null}
          {rice ? <li>{rice}</li> : null}
          {extras.map((extra) => (
            <li key={extra}>{extra}</li>
          ))}
          {stars ? <li>{`${stars} stars`}</li> : null}
          {notes ? <li>{notes}</li> : null}
        </ul>
      </CardContent>
      <CardActions style={{ float: "right" }}>
        <IconButton onClick={props.onOpen} >
          <EditIcon />
        </IconButton>
        <IconButton onClick={props.delete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CartItem;


