import { createStore, applyMiddleware, compose } from "redux";
import { logger } from "redux-logger";
import rootReducer from "./reducers";

/* Keep store data in LocalStorage */
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2
  // whitelist: ["auth", "createTemplate"]
};

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(logger)
);

export default store;
