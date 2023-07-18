import React, { useState } from "react";
import {
  Formik, Form, Field, ErrorMessage,
  FormikHelpers
} from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from "GlobalRedux/store";
import { useCreateMailerMutation, Mailer } from "GlobalRedux/api/nodemailerApi";
import { addMailer } from "GlobalRedux/features/nodemailerSlice";

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
    name: Yup.string().min(3, 'Too short').max(50, 'Too long').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    subject: Yup.string().min(3, 'Too short').max(50, 'Too long').required('Subject is required'),
    message: Yup.string().min(6, 'Message must be at least 6 characters').max(200, 'Too long').required('Email is required')
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
        console.log("Data de nodemailer: ", jsonData)
        dispatch(addMailer(data))
      } else {
        console.log("Error en creating mailer")
      }
    } catch (error) {
      console.log(error?.message || "Error desconocido")
    }
    resetForm();
  }



  return (
    <div className="w-full h-full bg-gray-900 text-gray-900 p-20 m-20">
      <Formik initialValues={{
        name: '',
        email: '',
        subject: '',
        message: '',
      }} validationSchema={validationSchema} onSubmit={handleSubmitMailer}>
        <Form
          // onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))} 
          className="max-w-xl mx-auto p-4 md:p-6 my-6 bg-gray-800 rounded-lg shadow-md"
        >

          <ErrorMessage name="name" component="div" className="text-red-500" />
          <Field
            id="name"
            name="name"
            type="text"
            placeholder="Nombre"
            className="w-full px-3 py-2 mb-3 text-gray-900 border-white border rounded-lg focus:outline-none" />

          <ErrorMessage name="email" component="div" className="text-red-500" />
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="Email" className="w-full px-3 py-2 mb-3 text-gray-900 border-white border rounded-lg focus:outline-none" />

          <ErrorMessage name="subject" component="div" className="text-red-500" />
          <Field
            id="subject"
            name="subject"
            type="text"
            placeholder="Asunto" className="w-full px-3 py-2 mb-3 text-gray-900 border-white border rounded-lg focus:outline-none" />

          <ErrorMessage name="message" component="div" className="text-red-500" />
          <Field
            id="message"
            name="message"
            type="text"
            placeholder="Deja Tú Mensaje" className="w-full px-3 py-2 mb-3 text-gray-900 border-white border rounded-lg focus:outline-none" />

          {/* <p className="mb-3 text-gray-700">{data}</p> */}

          <button type="submit"
            // disabled={!isValid} 
            // className={`w-full py-2 px-3 text-white rounded-lg font-medium tracking-wide transition duration-200 ${isValid ? 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer' : 'bg-indigo-300 cursor-not-allowed'}`} />
            className={`w-full py-2 px-3 text-white rounded-lg font-medium tracking-wide transition duration-200 bg-indigo-500 hover:bg-indigo-600 cursor-pointer'}`}>Enviar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default FormContact;

