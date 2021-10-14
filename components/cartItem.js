import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const cartItem = (props) => {
  const { name, itemPrice, protein, rice, extras, stars, notes } = props.item;

  return (
    <div>
      <div>
        <div style={{ float: "right" }}>{`$${itemPrice}`}</div>
        <div style={{ fontWeight: "bold" }}>{name}</div>
      </div>

      <ul>
        {protein ? <li>{protein}</li> : null}
        {rice ? <li>{rice}</li> : null}
        {extras.map((extra) => (
          <li key={extra}>{extra}</li>
        ))}
        {stars ? <li>{`${stars} stars`}</li> : null}
        {notes ? <li>{notes}</li> : null}
      </ul>
    </div>
  );
};

export default cartItem;
