import { useContext, useState } from "react";
import CartItem from "../components/cartItem";
import CartContext from "../utils/cart-context";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Input,
  TextField,
} from "@material-ui/core";

const Cart = () => {
  const { cart, total, addToOrders } = useContext(CartContext);
  const taxTotal = total * 0.065 + total;
  console.log(cart);

  const [name, setName] = useState("");

  const handleName = (event) => {
    const enteredName = event.target.value;
    setName(enteredName);
  };

  return (
    <div>
      {cart.length > 0 ? (
        <div>
          <TextField
            style={{ width: "100%" }}
            variant="filled"
            size="small"
            id="name"
            placeholder="name"
            value={name}
            onChange={(event) => handleName(event)}
          />
          <div>
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
            <div>{`$${total.toFixed(2)}`}</div>
            <div>{`$${taxTotal.toFixed(2)}`}</div>
          </div>
          <Button onClick={() => addToOrders(name)}>Add to orders</Button>
          <Button>Edit Cart</Button>
        </div>
      ) : (
        <div>Cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
