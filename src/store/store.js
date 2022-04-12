import { compose, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { rootReducer } from "./root.reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  //here goes the code that we want our middleware to do
  if (!action.type) {
    return next(action);
  }
  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("state", store.getState());

  next(action);
  console.log("next state: ", store.getState());
};

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));
//you need a root reduce to create a store
//logger allows to see:
//-> the state before and after the action
//-> what was the action
export const store = createStore(rootReducer, undefined, composedEnhancers);
