// All the middlewares
// store is a state warehouse which
import { createStore, applyMiddleware } from "redux";
//useful for the debug
import logger from "redux-logger";
// the redux-persist is to allow our browser to cache depending on certain configuration
import { persistStore } from "redux-persist";

//Thunk
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

// an array of middlewares. It is more scalable in this way
const middleWares = [thunk];

//if we are in the development environment, then use logger.
if (process.env.NODE_ENV === "development") {
  middleWares.push(logger);
}

// apply the middlewares
export const store = createStore(rootReducer, applyMiddleware(...middleWares));

//creating the persisited version of our store.
export const persistor = persistStore(store);

export default { store, persistor };
