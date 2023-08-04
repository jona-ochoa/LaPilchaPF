import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api/v1";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiURL,
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
        }),
        createUser: builder.mutation<User, Partial<User>>({
            query: (newUser) => ({
                url: '/user',
                method: 'POST',
                body: newUser,
            })
        })
    })
})

export const { useGetUsersQuery, useCreateUserMutation } = usersApi;