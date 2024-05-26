import { CartItem } from "../reducers/cartReducer";

export const getItemById = (items: CartItem[], id: string) => {
  return items.find((item) => item.id === id);
};
export const getTotalPrice = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
