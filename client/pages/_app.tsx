import React from 'react';
import Detail from '../src/components/ProductDetail/detail';
import Navbar from '../src/components/Navbar/Navbar';
import type { AppProps } from 'next/app';
import '../src/styles/globals.css'; // Importa el archivo CSS global de Tailwind CSS


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <Navbar />
      
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;