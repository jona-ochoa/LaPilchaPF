"use client"

import React from 'react';
import { Providers } from "../GlobalRedux/provider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <Providers>
        {children}
      </Providers>
      
    </>
  );
}
