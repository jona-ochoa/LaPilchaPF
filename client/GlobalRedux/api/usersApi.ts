import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    image: string | null;
};

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002',
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