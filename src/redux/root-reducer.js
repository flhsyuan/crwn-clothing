import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import directoryReducer from "./directory/directory.reducer";
import userReducer from "./user/user-reducer";
import cartReducer from "./cart/cart.reducer";
import shopReducer from "./shop/shop.reducer";

//the configuration of the persistor
const persistConfig = {
  key: "root",
  storage,
  // the array contains the reducer that we want to store
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
