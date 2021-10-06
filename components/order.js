import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { useContext } from "react";
import CartContext from "../utils/cart-context";

const Order = (props) => {
  const { items, name, time, total } = props.order;
  const { markOrderComplete } = useContext(CartContext);

  return (
    <Card>
      <CardHeader title={name} />
      <div>{time}</div>
      <CardContent>
        {items.map((item, index) => (
          <div key={index}>
            <h1>{item.name}</h1>
            <ul>
              {item.protein ? <li>{item.protein}</li> : null}
              {item.rice ? <li>{item.rice}</li> : null}
              {item.extras
                ? item.extras.map((extra, index) => (
                    <li key={index}>{extra}</li>
                  ))
                : null}
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
        <IconButton onClick={() => markOrderComplete(name)}>
          <CheckIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Order;
