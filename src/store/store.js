import { compose, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { rootReducer } from "./root.reducer";

const logger = createLogger({});
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));
//you need a root reduce to create a store
//logger allows to see:
//-> the state before and after the action
//-> what was the action
export const store = createStore(rootReducer, undefined, composedEnhancers);
