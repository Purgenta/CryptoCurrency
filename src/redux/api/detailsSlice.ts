type CurrencyDetails = {
  mid: number;
  bid: number;
  ask: number;
  last_price: number;
  low: number;
  high: number;
  volume: number;
  timestamp: number;
};
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const currencyDetailsApi = createApi({
  reducerPath: "currencyDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getCurrencyDetails: builder.query<CurrencyDetails, string>({
      query: (symbol) => `/v1/pubticker/${symbol}`,
    }),
  }),
});
export const { useGetCurrencyDetailsQuery } = currencyDetailsApi;
