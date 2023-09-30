import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
import { currenciesApi } from "./api/apiSlice";
import { currencyDetailsApi } from "./api/detailsSlice";
import favouriteSlice from "./favouriteSlice/favouriteSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    [currenciesApi.reducerPath]: currenciesApi.reducer,
    [currencyDetailsApi.reducerPath]: currencyDetailsApi.reducer,
    favourites: favouriteSlice,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat([
      currenciesApi.middleware,
      currencyDetailsApi.middleware,
    ]),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
