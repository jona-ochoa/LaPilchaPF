import React from "react";
import Image from 'next/image';
import Login from "components/Login"; 
import logoBlack from "../../public/logoBlack.png";

const LoginPage = () => {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen  mt-auto">
      <div className="text-center mb-8">
        {/* <Image src={logoBlack} alt="Company Logo" width={150} height={50} /> */}
        <h2 className="text-2xl font-bold text-center leading-9 tracking-tight mt-10">¡Bienvenido!</h2>
      </div>
      <Login />
    </div>
  );
};

export default LoginPage;
