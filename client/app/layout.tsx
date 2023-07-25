"use client"
import {Inter} from "next/font/google"
import React from 'react';
import { Providers } from "../GlobalRedux/provider";
import { SessionProvider } from "next-auth/react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { Toaster } from "./Toaster"
import { ThemeProvider } from "next-themes";
import DarkMode from "components/DarkMode";
import "./globals.css";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <SessionProvider>
      <Providers>
      <body className={inter.className}>
      <ThemeProvider defaultTheme="light">
      <Toaster position="bottom-right" reverseOrder={false}/>
      <Navbar />
      <DarkMode />
       {children}
       <footer className="mt-auto">
      <Footer />
       </footer>
       </ThemeProvider>
       </body> 
      </Providers>
      </SessionProvider>
    </html>
      
  );
}
