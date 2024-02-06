import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getProductCategories: builder.query({
      query: () => ({
        url: `/products/categories`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    addSingleProduct: builder.mutation({
      query: (data) => ({
        url: "/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateSingleProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteSingleProduct: builder.mutation({
      query: (deleteId) => ({
        url: `/delete-product/${deleteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetProductCategoriesQuery,
  useAddSingleProductMutation,
  useDeleteSingleProductMutation,
  useUpdateSingleProductMutation,
} = productsApi;
