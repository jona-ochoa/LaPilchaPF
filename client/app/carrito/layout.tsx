"use client"
import Footer from 'components/Footer';
import React from 'react';
import NavBar from "../../components/Navbar"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
      <header>
      <NavBar></NavBar>
      </header>

       {children}

       <footer>
      <Footer></Footer>
       </footer> 
       </body>
    </html>
    )}