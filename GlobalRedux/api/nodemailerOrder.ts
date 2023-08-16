import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dotenv from "dotenv";

dotenv.config();

export type MailerOrder = {
  name: string;
  email: string;
  subject: string;
  buyOrder: string | Array<{
    id: string;
    title: string;
    unit_price: string;
    quantity: number;
  }>;
};

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http:localhost:3002/api/v1"

export const nodemailerOrder = createApi({
  reducerPath: "nodemailerOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL
  }),
  endpoints: (builder) => ({
    createMailerOrder: builder.mutation<MailerOrder, Partial<MailerOrder>>({
      query: (newMailerOrder) => ({
        url: "/nodemailer/orden-de-compra",
        method: "POST",
        body: newMailerOrder,
      }),
    }),
  }),
});

export const { useCreateMailerOrderMutation } = nodemailerOrder;
