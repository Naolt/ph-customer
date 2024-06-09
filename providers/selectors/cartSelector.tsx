import { CartItem } from "../reducers/cartReducer";

export const getItem = (
  items: CartItem[],
  {
    product_id,
    pharmacy_id,
  }: {
    product_id: any;
    pharmacy_id: any;
  }
) => {
  return items.find(
    (item) => item.product_id == product_id && item.pharmacyId == pharmacy_id
  );
};
export const getTotalPrice = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
