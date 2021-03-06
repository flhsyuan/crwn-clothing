import CartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

//define the initial state
const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

//the operation done to the initial state based on different action types
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        // keep the original items in the cart and add the action payload to the items array
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        // filter all the items in the cart to keep all the needed items
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };

    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};
export default cartReducer;
