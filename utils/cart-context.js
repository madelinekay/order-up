import React, { useState } from "react";

const CartContext = React.createContext({
  cart: [],
  total: null,
  addItem: (item) => {},
});

export const CartContextProvider = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (item) => {
    if (item in cart) {
      setCart((state) => [...state, { ...item, quantity: 0 }]);
    }

    setCart((state) => [...state, { ...item, quantity: 0 }]);
  };

  const contextValue = {
    cart,
    total,
    addItem,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
