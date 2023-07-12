"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";


interface IFormInputs {
  firstName: string;
  lastName: string;
  category: string;
  commentary: string;
}

const FormContact = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IFormInputs>({
    mode: "onChange"
  });
  const [data, setData] = useState("");

  return (
    
    <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))} className="max-w-xl mx-auto p-4 md:p-6 my-6 bg-white rounded-lg shadow-md">
      
      <input {...register("firstName", { required: "Nombre Requerido" })} placeholder="Nombre" className="w-full px-3 py-2 mb-3 text-gray-700 border-black border rounded-lg focus:outline-none" />
      {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

      <input {...register("lastName", { required: "Apellido Requerido" })} placeholder="Apellido" className="w-full px-3 py-2 mb-3 text-gray-700 border-black border rounded-lg focus:outline-none" />
      {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
      
      {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      
      <textarea {...register("commentary", { required: "Campo Requerido" })} placeholder="Deja Tú Mensaje" className="w-full px-3 py-2 mb-3 text-gray-700 border-black border rounded-lg focus:outline-none" />
      {errors.commentary && <p className="text-red-500">{errors.commentary.message}</p>}
      
      <p className="mb-3 text-gray-700">{data}</p>
      
      <input type="submit" disabled={!isValid} className={`w-full py-2 px-3 text-white rounded-lg font-medium tracking-wide transition duration-200 ${isValid ? 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer' : 'bg-indigo-300 cursor-not-allowed'}`} />
      
    </form>
  );
}

export default FormContact;

