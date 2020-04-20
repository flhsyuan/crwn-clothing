import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";
import cartReducer from "./cart/cart.reducer";

// the parameters past into this function is an object with several attributes
export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
