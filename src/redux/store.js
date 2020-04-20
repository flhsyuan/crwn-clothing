import { createStore, applyMiddleware } from "redux";
//useful for the debug
import logger from "redux-logger";

import rootReducer from "./root-reducer";

// an array of middlewares. It is more scalable in this way
const middleWares = [logger];

// apply the middlewares
const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
