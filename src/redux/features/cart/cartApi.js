import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: (email) => ({
        url: `/cart/${email}`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation({
      query: ({ email, data }) => ({
        url: `/cart/${email}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
    removeCartItem: builder.mutation({
      query: ({ email, id }) => ({
        url: `/cart/${email}/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["cart"],
    }),
    emptyUserCart: builder.mutation({
      query: (email) => ({
        url: `/cart/${email}/orderConfirmed`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToCartMutation,
  useRemoveCartItemMutation,
  useEmptyUserCartMutation,
} = cartApi;
