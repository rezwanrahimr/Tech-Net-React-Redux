import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/posts',
    }),
    getSingleProduct: builder.query({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = api;
