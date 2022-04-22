import { AnyAction } from "redux";
import { USER_ACTION_TYPES } from "./user.types";
import { SetCurrentUser } from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";

const INITIAL_STATE = {
  currentUser: null,
};

export type UserState = {
  readonly currentUser: UserData | null;
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state; //by returning the state means this reducer doesn't need to update;
  }
};
