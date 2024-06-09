export type CartItem = {
  product_id: string;
  pharmacyId: number;
  quantity: number;
  price: number;
  image: string;
  name: string;
  brand: string;
  pharmacy: string;
  maxQuantity: number;
  isPrescriptionRequired: boolean;
};

export type OrderDetail = {
  user_id: string;
  pharmacy_id: string;
  status: string;
  payment_status: string;
  order_type: string;
  order_address: string;
  additional_note: string;
  longitude: string;
  latitude: string;
  total_amount?: number;
  delivery_amount?: number;
};

export type CartState = {
  items: CartItem[];
  orderDetail: OrderDetail;
};

export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | {
      type: "REMOVE_ONE_FROM_CART";
      payload: { product_id: string; pharmacyId: number };
    }
  | {
      type: "REMOVE_ITEM_FROM_CART";
      payload: { product_id: string; pharmacyId: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "UPDATE_ORDER_DETAIL"; payload: OrderDetail };

export const initialState: CartState = {
  items: [],
  orderDetail: {
    user_id: "",
    pharmacy_id: "",
    status: "pending",
    payment_status: "pending",
    order_type: "",
    order_address: "",
    additional_note: "",
    longitude: "",
    latitude: "",
  },
};

const cartReducer = (
  state: CartState = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.pharmacyId === action.payload.pharmacyId
      );
      if (existingItem) {
        if (existingItem.quantity < existingItem.maxQuantity) {
          return {
            ...state,
            items: state.items.map((item) =>
              item.product_id === action.payload.product_id &&
              item.pharmacyId === action.payload.pharmacyId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      break;
    case "REMOVE_ONE_FROM_CART":
      const itemToRemoveOne = state.items.find(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.pharmacyId === action.payload.pharmacyId
      );
      if (itemToRemoveOne && itemToRemoveOne.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product_id === action.payload.product_id &&
            item.pharmacyId === action.payload.pharmacyId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              item.product_id !== action.payload.product_id ||
              item.pharmacyId !== action.payload.pharmacyId
          ),
        };
      }
      break;
    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            item.product_id !== action.payload.product_id ||
            item.pharmacyId !== action.payload.pharmacyId
        ),
      };
    case "CLEAR_CART":
      return initialState;

    case "UPDATE_ORDER_DETAIL":
      return {
        ...state,
        orderDetail: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
