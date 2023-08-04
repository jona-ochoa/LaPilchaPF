import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Mailer = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http:localhost:3002"

export const nodemailerApi = createApi({
  reducerPath: "nodemailerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
  }),
  endpoints: (builder) => ({
    createMailer: builder.mutation<Mailer, Partial<Mailer>>({
      query: (newMailer) => ({
        url: "/nodemailer/contacto",
        method: "POST",
        body: newMailer,
      }),
    }),
  }),
});

export const { useCreateMailerMutation } = nodemailerApi;