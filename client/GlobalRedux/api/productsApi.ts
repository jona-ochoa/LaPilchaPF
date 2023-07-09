import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
  rating: any;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], null>({
      query: () => "/products",
    }),
    getProductsById: builder.query<Product, { id: string }>({
      query: (id) => `/products/${id}`,
    }),
    getProductsByTitle: builder.query<Product[], { title: string }>({
      query: ({ title }) => `/products/search?keyword=${title}`,
    }),
    postProducts: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useGetProductsByTitleQuery,
  usePostProductsMutation,
} = productsApi;
