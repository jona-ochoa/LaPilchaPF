'use client'
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResetPassword = ({token}) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleResetPassword = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        //validar que las contraseñas coinciden
        if(password !== confirmPassword) {
            toast.error("las contraseñas no coinciden");
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3002/reset-password`, { token, password })
            const data = response.data;
            if(data.message){
                toast.success(data.message);
                router.push("/login");
            } else {
                toast.error("error al reestablecer la contraseña.")
            }
        } catch (error) {
            console.error(error)
            toast.error("error al reestablecer la contraseña.")
        } finally {
            setIsLoading(false)
        }
    }

    if(typeof window === "undefined") {
        return null;
    }

    if(isLoading) {
        return <div>Cargando...</div>
    }

    return(
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
                <h2 className="mb-1 text-2xl font-bold leading-tigh tracking-tight text-gray-700 md:text-2xl">Cambia tu contraseña</h2>
                <form onSubmit={handleResetPassword} className="mt-4 space-y-4 lg:mt-5 md:spce-y-5">

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 ">Escribe tu email: </label>
                        <input type="email" name="email" id="email" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Escribe tu email..." required/>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 ">Escribe tu nueva contraseña: </label>
                        <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"  type="password" name="password" id="password" placeholder="Escribe tu contraseña..."/>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 ">Confirma tu nueva contraseña: </label>
                        <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Escribe tu contraseña..."/>
                    </div>
                
                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center " >Aceptar</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;