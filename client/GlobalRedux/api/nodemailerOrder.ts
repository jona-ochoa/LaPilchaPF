import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const nodemailerOrder = createApi({
  reducerPath: "nodemailerOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002",
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
