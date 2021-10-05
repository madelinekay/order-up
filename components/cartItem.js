import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const cartItem = (props) => {
  const { name, itemPrice, protein, rice, extras, stars, notes } = props.item;

  return (
    <Card>
      <CardHeader title={name} />
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
        <div>{itemPrice}</div>
      </CardContent>
    </Card>
  );
};

export default cartItem;
