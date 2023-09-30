import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
import { currenciesApi } from "./api/apiSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    [currenciesApi.reducerPath]: currenciesApi.reducer,
  },
  middleware: (defMiddleware) => {
    return defMiddleware().concat(currenciesApi.middleware);
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
