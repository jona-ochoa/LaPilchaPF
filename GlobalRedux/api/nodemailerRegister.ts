import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dotenv from "dotenv";

dotenv.config();

export type MailerRegister = {
  name: string;
  email: string;
  subject: string;
  lastname: string;
};

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http:localhost:3002/api/v1"

export const nodemailerRegister = createApi({
  reducerPath: "nodemailerRegister",
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL
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
