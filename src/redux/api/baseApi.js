import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://easy-mart-server-sandy.vercel.app",
  prepareHeaders: (headers, { getState }) => {
    const { userToken: token } = getState().user;

    if (token) {
      headers.set("authorization", token);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["products", "users", "user", "orders", "cart", "reviews"],
  endpoints: () => ({}),
});
