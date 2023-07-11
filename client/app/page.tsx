"use client"

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductsPage from './products/page';
import RootLayout from './layout';
import './globals.css';

const HomePage = () => {
  return (
       <main>
    <div>  
      <RootLayout>
      <Navbar />
      <ProductsPage />
      <Footer />
      </RootLayout>
    </div>
       </main>
  
  );
}

export default HomePage;
