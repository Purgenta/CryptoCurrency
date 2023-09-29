import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
const store = configureStore({ reducer: { auth: authSlice } });
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
