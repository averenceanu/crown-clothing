import logger from "redux-logger";
import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { rootReducer } from "./root.reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//EXAMPLE of middleWare
// const loggerMiddleware = (store) => (next) => (action) => {
//   //here goes the code that we want our middleware to do
//   if (!action.type) {
//     return next(action);
//   }
//   console.log("type", action.type);
//   console.log("payload", action.payload);
//   console.log("state", store.getState());

//   next(action);
//   //console.log("next state: ", store.getState());
// };

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  (middleWares): middleWares is Middleware => Boolean(middleWares)
);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
//you need a root reduce to create a store
//logger allows to see:
//-> the state before and after the action
//-> what was the action
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
