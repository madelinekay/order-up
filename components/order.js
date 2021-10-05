import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const Order = (props) => {
  const { items, name, time, total } = props.order;

  return (
    <Card>
      <CardHeader title={name} />
      <div>{time}</div>
      <CardContent>
        {items.map((item) => (
          <div key={item.name + Date.now()}>
            <h1>{item.name}</h1>
            <ul>
              {item.protein ? <li>{item.protein}</li> : null}
              {item.rice ? <li>{item.rice}</li> : null}
              {item.extras.map((extra) => (
                <li key={extra}>{extra}</li>
              ))}
              {item.stars ? <li>{`${item.stars} stars`}</li> : null}
              {item.notes ? <li>{item.notes}</li> : null}
            </ul>
            <div>{item.itemPrice}</div>
          </div>
        ))}
        <div>{total.toFixed(2)}</div>
      </CardContent>
      <CardActions>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Order;
