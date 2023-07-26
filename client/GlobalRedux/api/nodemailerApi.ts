import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Mailer = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const nodemailerApi = createApi({
  reducerPath: "nodemailerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002",
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