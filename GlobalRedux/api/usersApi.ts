import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dotenv from "dotenv";

dotenv.config();

export type User = {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    image: string | null;
    isAdmin: boolean;
    isBanned: boolean;
};

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiURL,
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/api/v1/users',
        }),
        createUser: builder.mutation<User, Partial<User>>({
            query: (newUser) => ({
                url: '/api/v1/user',
                method: 'POST',
                body: newUser,
            })
        })
    })
})

export const { useGetUsersQuery, useCreateUserMutation } = usersApi;