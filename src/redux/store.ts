import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import categoriesReducer from "./reducers/categoriesReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "authReducer"],
};

const rootReducer = combineReducers({
  productsReducer,
  cartReducer,
  usersReducer,
  authReducer,
  categoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

const store = createStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
