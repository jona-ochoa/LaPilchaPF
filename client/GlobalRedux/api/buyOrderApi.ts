import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type BuyOrder = {
_id: any;
status: string;
total: number;
items: itemBuyOrder[];
userId: string;
createdAt: any;
}

type itemBuyOrder = {
    id: string;
    title: string;
    unit_price: number;
    quantity: number;
}

export const buyOrderApi = createApi({
    reducerPath: "buyOrderApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3002",
    }),
    endpoints: (builder) => ({
      getOrders: builder.query<BuyOrder[], null>({
        query: () => "/orders",
      }),
      getOrdersById: builder.query<BuyOrder, { _id: any }>({
        query: (id) => `/orders/${id}`,
      }),
      
    }),
  });
  
  export const {
    useGetOrdersQuery,
    useGetOrdersByIdQuery,
  } = buyOrderApi; 
  