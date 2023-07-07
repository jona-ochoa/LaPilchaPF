import React from 'react';
/* import Detail from '../src/components/ProductDetail/detail'; */
import Navbar from '../src/components/Navbar/Navbar';
import Footer from '../src/components/Footer/Footer';
import type { AppProps } from 'next/app';
import '../src/styles/globals.css'; // Importa el archivo CSS global de Tailwind CSS


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <Navbar />
      
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default MyApp;