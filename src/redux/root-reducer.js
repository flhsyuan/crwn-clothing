import userReducer from "./user/user-reducer";

import { combineReducers } from "redux";

// the parameters past into this function is an object with several attributes
export default combineReducers({
  user: userReducer,
});
