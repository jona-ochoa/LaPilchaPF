import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { default as axios } from 'axios';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password"}
      },
      authorize: async (credentials: Record<"email" | "password", string> | undefined ) => {
        if(credentials) {
          const { email, password } = credentials;

        //verificar las credenciales en la bdd
          const user = await verifyCredentials(email, password)
          if(user) {
            return Promise.resolve(user)
          } else {
            return Promise.resolve(null)
          }
        } else {
          return Promise.resolve(null)
        }
      }
    }),
  ],
};

//funcion para verificar las credenciales en la bdd

const verifyCredentials = async (email: string, password: string) => {
  try {
    //consultar la bdd para buscar el user por nombre de user
    const response = await axios.get("http://localhost:3002/users");
    const users = response.data
    console.log('Users from db: ', users)
    const user = users.find(
      (user: any) => user.email === email && user.password === password
    );
    console.log("User found: ", user);
    if(user) {
      return user;
    } else {
      return null
    }
  } catch (error) {
  console.error("Error al verificar las credenciales: ", error)
  return null;    
  }
}