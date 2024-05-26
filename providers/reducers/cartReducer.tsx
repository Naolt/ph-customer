export type CartItem = {
  id: string;
  quantity: number;
  price: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_ONE_FROM_CART"; payload: any }
  | { type: "REMOVE_ITEM_FROM_CART"; payload: any }
  | { type: "CLEAR_CART" };

export const initialState: CartState = {
  items: [],
};

const cartReducer = (
  state: CartState = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    case "REMOVE_ONE_FROM_CART":
      const itemToRemoveOne = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToRemoveOne && itemToRemoveOne.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      }
    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};

export default cartReducer;
