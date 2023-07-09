import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface products {
    id: string;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: Rating[];
  }
  
  interface Rating {
    rate: number;
    count: number;
  }  

const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3002",
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<products[],null>({
            query: () => `/products`,
        }),
        getProductsById: builder.query<products, { id: any }>({
            query: ({id}) => `/products/${id}`,
        }),
        getProductsByTitle: builder.query<products, { title: string }>({
            query: ({title}) => `/products/${title}`,
        }),
    }),

})

export const { useGetProductsQuery, useGetProductsByIdQuery, useGetProductsByTitleQuery } = productsApi 