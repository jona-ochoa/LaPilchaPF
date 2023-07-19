"use client"
import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,

  ErrorMessage,
  FormikHelpers
} from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from "GlobalRedux/store";
import { useCreateMailerMutation, Mailer } from "GlobalRedux/api/nodemailerApi";
import { addMailer } from "GlobalRedux/features/nodemailerSlice";
import toast from 'react-hot-toast';

interface IFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const FormContact: React.FC = () => {

  const [createMailerMutation, { data }] = useCreateMailerMutation();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Mínimo 3 caracteres.').max(50, 'Maximo 50 caracteres.').required('Nombre es requerido.'),
    email: Yup.string().email('Email Inválido.').required('Email es requerido.'),
    subject: Yup.string().min(3, 'Mínimo 3 caracteres.').max(50, 'Máximo 50 caracteres.').required('Asunto es requerido.'),
    message: Yup.string().min(6, 'Mínimo 6 caracteres.').max(200, 'Máximo 200 caracteres.').required('Mensaje es requerido.')
  })

  const handleSubmitMailer = async (values: IFormInputs, { resetForm }: FormikHelpers<IFormInputs>) => {
    try {
      const { name, email, subject, message } = values;


      if (!name || !email || !subject || !message) {
        console.log("Por favor, completa todos los campos requeridos.");
        return;
      }

      const newMailer: Partial<Mailer> = {
        name,
        email,
        subject,
        message
      }

      const result = await createMailerMutation(newMailer);

      if ('data' in result) {
        const { data } = result;
        const jsonData = JSON.stringify(data);
        dispatch(addMailer(data))
        toast.success('Mensaje enviado con éxito', {
          duration: 4000
        });
        window.location.href = '/login';
      } else {
        console.log("Error al enviar el formulario.")
        toast.error('Error de envio.');
      }
    } catch (error) {
      console.log(error?.message || "Error desconocido")
      toast.error('Error al enviar el mensaje.');
    }
    resetForm();
  }

  return (
    <div className="w-full h-full pb-12 text-center bg-gray-500 text-gray-900 flex flex-col justify-center">
      <div className="px-auto py-10">
        <h2 className="text-gray-200 text-5xl text-center font-extrabold">Formulario de contacto</h2>
      </div>
      <div>
        <Formik initialValues={{
          name: '',
          email: '',
          subject: '',
          message: '',
        }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitMailer}
        >
          <Form
            className="max-w-xl mx-auto p-4 md:p-6 my-0 text-left bg-gray-800 rounded-lg shadow-md"
          >

            <label htmlFor="name" className="text-white font-extrabold tracking-widest mb-2">Nombre</label>
            <ErrorMessage name="name" component="div" className="text-red-500" />
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Nombre"
              className="w-full px-3 py-2 mb-3 text-gray-900 border-white border rounded-lg focus:outline-none" />

            <label htmlFor="email" className="text-white font-extrabold tracking-widest mb-2">Email</label>
            <ErrorMessage name="email" component="div" className="text-red-500" />
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Email" className="w-full px-3 py-2 mb-3 text-gray-900 border-white border rounded-lg focus:outline-none" />

            <label htmlFor="subject" className="text-white font-extrabold tracking-widest mb-2">Asunto</label>
            <ErrorMessage name="subject" component="div" className="text-red-500" />
            <Field
              id="subject"
              name="subject"
              type="text"
              placeholder="Asunto" className="w-full px-3 py-2 mb-3 text-gray-900 border-white border rounded-lg focus:outline-none" />

            <label htmlFor="message" className="text-white font-extrabold tracking-widest mb-2">Mensaje</label>
            <ErrorMessage name="message" component="div" className="text-red-500" />
            <Field
              id="message"
              as="textarea"
              name="message"
              placeholder="Deja Tú Mensaje" className="w-full px-3 py-2 mb-3 text-gray-900 border-white border rounded-lg focus:outline-none" />
            <button type="submit"
              className={`w-full py-2 px-3 text-white rounded-lg font-medium tracking-wide transition duration-200 bg-indigo-500 hover:bg-indigo-600 cursor-pointer'}`}>Enviar</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default FormContact;

