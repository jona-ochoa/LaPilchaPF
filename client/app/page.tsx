
"use client"

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductsPage from './products/page';
import RootLayout from './layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './globals.css';

const HomePage = () => {
  return (
    <Router>   
    <div>  
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default HomePage;
