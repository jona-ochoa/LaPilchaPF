'use client'
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            console.log("a ve si funciona", email);
            const response = await axios.post(`http://localhost:3002/nodemailer/forgot-password`, { email: email });
            const data = response.data;
            console.log("esta es la data despues del post", data);
            if (data && data.message) {
                toast.success(data.message);
            } else {
                toast.error("Error al enviar el correo de recuperación de contraseña.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al enviar el correo de recuperación de contraseña.");
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-3/4 h-auto p-3 bg-white rounded-lg flex justify-center items-center">
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <div className="px-8 mb-4 text-center">
                                <h3 className="mb-1 text-2xl font-bold leading-tigh tracking-tight text-gray-700 md:text-2xl">¿Olvidaste tu contraseña?</h3>
                                <p className="mb-4 text-sm text-gray-700"> ¡No te preocupes! Escribe por favor tu email para que podamos enviarte un link para recuperartu contraseña </p>
                            </div>
                            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded-lg">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">Email: </label>
                                    <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email" type="email" placeholder="Escribe tu email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-6 text-center">
                                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-700 hover:bg-blue-500 rounded-full focus:outline-none focus:shadow-outline"> Enviar email </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a href="/userForm" className="inline-block text-sm text-blue-500 hover:text-blue-300 align-baseline"> ¿Todavía no tenes una cuenta? Crea una! </a>
                                </div>
                                <div className="text-center">
                                    <a href="/login" className="inline-block text-sm text-blue-500 hover:text-blue-300 align-baseline">Si ya tenés una, ingresá </a>
                                </div>
                            </form>
                        </div>
            </div>
        </div>
    )
}


export default ForgetPassword;
{/*<h2></h2>
            <form> 
                <div>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit">Enviar correo de recuperación</button>
            </form>
            <p> {message} </p>*/}