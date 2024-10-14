import { baseApi } from "../../api/baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query({
      query: (productId) => ({
        url: `/product-reviews/${productId}`,
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),
    addProductReview: builder.mutation({
      query: (data) => ({
        url: "/product-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const { useGetProductReviewsQuery, useAddProductReviewMutation } =
  reviewsApi;
