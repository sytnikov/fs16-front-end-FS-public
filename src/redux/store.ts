import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "authReducer"] // it's not a good idea to add the whole authReducer here
};

const rootReducer = combineReducers({
  productsReducer,
  cartReducer,
  usersReducer,
  authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)

export default store;
