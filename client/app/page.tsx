"use client"
import { AppProps } from 'next/app';
import { Providers } from '../GlobalRedux/provider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RootLayout from './layout';
import './globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers currentPath={null}>
      <Navbar />
      <RootLayout>  
        <Component {...pageProps} />
      </RootLayout>
      <Footer />
    </Providers>
  );
};

export default MyApp;


