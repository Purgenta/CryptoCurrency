import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type Currencies = string[];
export const currenciesApi = createApi({
  reducerPath: "currencies",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://try.readme.io/https://api.bitfinex.com",
  }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<Currencies, undefined>({
      query: () => "/v1/symbols",
    }),
  }),
});
export const { useGetCurrenciesQuery } = currenciesApi;
