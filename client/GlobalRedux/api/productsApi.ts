import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type products = {
    id: string;
    title: string;
    price: string;
    description: string;
    image: string;
    category: string;
    rating: any 
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
        getProductsById: builder.query<products, { id: string }>({
            query: ({id}) => `/products/${id}`,
        }),
        getProductsByTitle: builder.query<products, { title: string }>({
            query: ({title}) => `/products/search?keyword=${title}`,
        }),
      /*   postProducts: builder.mutation<products, null>({
            query: () => `/products`,
    }) */
    })
})

export const { useGetProductsQuery, useGetProductsByIdQuery, useGetProductsByTitleQuery, /* usePostProductsMutation */ } = productsApi