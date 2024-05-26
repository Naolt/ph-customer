import React, { createContext, useReducer } from "react";
import cartReducer, {
  CartState,
  CartAction,
  initialState,
} from "./reducers/cartReducer"; // import your reducer, state and action types, and initial state

export const CartContext = createContext<{
  cartState: CartState;
  cartDispatch: React.Dispatch<CartAction>;
}>({
  cartState: initialState,
  cartDispatch: () => undefined,
});

export default function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
}
