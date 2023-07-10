"use client"
import {Inter} from "next/font/google"
import React from 'react';
import { Providers } from "../GlobalRedux/provider";
import "./globals.css";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <Providers>
      <body className={inter.className}>
       {children}
       </body> 
      </Providers>
    </html>
      
  );
}
