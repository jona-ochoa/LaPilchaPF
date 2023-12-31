import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dotenv from "dotenv";

dotenv.config();

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

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http:localhost:3002";

export const buyOrderApi = createApi({
    reducerPath: "buyOrderApi",
    baseQuery: fetchBaseQuery({
      baseUrl: apiURL,
    }),
    endpoints: (builder) => ({
      getOrders: builder.query<BuyOrder[], null>({
        query: () => "/api/v1/orders",
      }),
      getOrdersById: builder.query<BuyOrder, { _id: any }>({
        query: (id) => `/api/v1/orders/${id}`,
      }),
      
    }),
  });
  
  export const {
    useGetOrdersQuery,
    useGetOrdersByIdQuery,
  } = buyOrderApi; 
  