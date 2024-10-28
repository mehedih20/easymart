import { baseApi } from "../../api/baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getSingleUserOrders: builder.query({
      query: (email) => ({
        url: `/orders/${email}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getUserLastThreeOrders: builder.query({
      query: (email) => ({
        url: `/latest-orders/${email}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    createUserOrder: builder.mutation({
      query: (data) => ({
        url: `/orders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleUserOrdersQuery,
  useGetUserLastThreeOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useCreateUserOrderMutation,
} = ordersApi;
