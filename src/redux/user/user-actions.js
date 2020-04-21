import { UserActionTypes } from "./user.types";
//take the user and set the type to set current user
export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  //the data that this action carries
  payload: user,
});
