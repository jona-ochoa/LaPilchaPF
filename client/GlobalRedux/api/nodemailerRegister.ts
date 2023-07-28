import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type MailerRegister = {
  name: string;
  email: string;
  subject: string;
  lastname: string;
};

export const nodemailerRegister = createApi({
  reducerPath: "nodemailerRegister",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002",
  }),
  endpoints: (builder) => ({
    createMailerRegister: builder.mutation<MailerRegister, Partial<MailerRegister>>({
      query: (newMailerRegister) => ({
        url: "/nodemailer/register",
        method: "POST",
        body: newMailerRegister,
      }),
    }),
  }),
});

export const { useCreateMailerRegisterMutation } = nodemailerRegister;
