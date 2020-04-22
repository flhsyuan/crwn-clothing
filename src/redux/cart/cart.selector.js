import { createSelector } from "reselect";

// the aim of selectors is to prevent components from re-rendered when any part of the state is changed

// input selector and output selector
// input selector does not use the createSelector and output selector use the input selector and createSelector to build themselves

//get the new state and return just a slice of it
const selectCart = (state) => state.cart;

// two arguments:1. a colleciton of input selectors.    2. the value you want out of the selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0 //the initial value
    )
);
