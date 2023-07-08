import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type products = {
    id: any;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
    numReviews: number;
}

const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<products[],null>({
            query: () => `/products`,
        }),
        getProductsById: builder.query<products, { id: any }>({
            query: ({id}) => `/products/${id}`,
        }),
    }),

})

export const { useGetProductsQuery, useGetProductsByIdQuery } = productsApi 