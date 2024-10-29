import { baseApi } from "../../api/baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = ordersApi;
