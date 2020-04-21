import CartActionTypes from "./cart.types";
import { addItemToCart } from "./cart.utils";

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
    default:
      return state;
  }
};
export default cartReducer;
