import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dotenv from "dotenv";

dotenv.config();

export type Product = {
  _id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
  rating: any;
  isDeactivated: boolean;
  count: number;
};

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http:localhost:3002/api/v1"

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], null>({
      query: () => "/api/v1/products",
    }),
    getProductsById: builder.query<Product, { id: string }>({
      query: (id) => `/api/v1/products/${id}`,
    }),
    getProductsByTitle: builder.query<Product[], { title: string }>({
      query: ({ title }: { title: string }) => `/api/v1/products/search?keyword=${title}`,
      transformResponse: (response: any) => response.products,
    }),
    postProducts: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: "/api/v1/products",
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
