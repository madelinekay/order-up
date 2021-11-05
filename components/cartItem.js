import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, Chip, IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  header: {
    fontSize: 5,
  }
})

const cartItem = (props) => {
  const classes = useStyles();
  const { name, itemPrice, protein, rice, extras, stars, notes, quantity } =
    props.item;


  return (
    <Card>
      <CardHeader
        className={classes.header}
        title={`${name}${quantity > 1 ? ` X${quantity}` : ""}`}
        action={<Chip label={`$${(itemPrice * quantity).toFixed(2)}`} style={{ fontSize: 15 }} />}
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
        <IconButton>
          <EditIcon onClick={props.openEdit} />
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default cartItem;

// <div>
// <div>
//   <div style={{ float: "right" }}>{`$${(itemPrice * quantity).toFixed(
//     2
//   )}`}</div>
//   <div style={{ fontWeight: "bold" }}>{`${name}${
//     quantity > 1 ? ` X${quantity}` : ""
//   }`}</div>
// </div>

// <ul>
//   {protein ? <li>{protein}</li> : null}
//   {rice ? <li>{rice}</li> : null}
//   {extras.map((extra) => (
//     <li key={extra}>{extra}</li>
//   ))}
//   {stars ? <li>{`${stars} stars`}</li> : null}
//   {notes ? <li>{notes}</li> : null}
// </ul>
// </div>
