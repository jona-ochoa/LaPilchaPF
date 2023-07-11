"use client"
import {Inter} from "next/font/google"
import React from 'react';
import { Providers } from "../GlobalRedux/provider";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <SessionProvider>
      <Providers>
      <body className={inter.className}>
       {children}
       </body> 
      </Providers>
      </SessionProvider>
    </html>
      
  );
}
