"use client"

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
// redux - ver acciones para user
import { useAppDispatch } from "GlobalRedux/store";
import { useCreateUserMutation, User } from "GlobalRedux/api/usersApi";
import { addUser } from "GlobalRedux/features/usersSlice";
//
import { useRouter } from "next/navigation";

interface UserForm {
  name: string;
  lastname: string;
  email: string;
  password: string;
  image: File | null;
}

const UserForm: React.FC = () => {
  const router = useRouter();
  const [createUserMutation, { data }] = useCreateUserMutation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too short').max(50, 'Too long').required('Name is required'),
    lastname: Yup.string().min(3, 'Too short').max(50, 'Too long').required('Lastname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters')
      .max(15, 'Password must be at most 15 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number')
      .required('Password is required'),
  });

  const handleSubmit = async (
    values: UserForm,
    { resetForm }: FormikHelpers<UserForm>
  ) => {
    try {
      const { name, lastname, email, password } = values;
      if (selectedImage) {
        // La imagen ya ha sido cargada previamente, utilizamos la URL directamente
        const newUser: Partial<User> = {
          name,
          lastname,
          email,
          password,
          image: selectedImage, // Utilizamos la URL de selectedImage
        };
        const result = await createUserMutation(newUser);
        if ("data" in result) {
          const { data } = result;
          console.log("User created: ", data);
          dispatch(addUser(data));
          setShowSuccessAlert(true);
        }
      }
    } catch (error) {
      console.error("Error creating user: ", error);
    }
    resetForm();
  };

  const handleResetImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const image = e.currentTarget.files?.[0];
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'PUsers');

        const response = await fetch(`https://api.cloudinary.com/v1_1/djwbjv70t/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setSelectedImage(imageUrl);
          setPreviewImage(imageUrl);
        } else {
          throw new Error('Image upload failed.');
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="border-b bg-gradient-to-r from-slate-300 to-slate-500 min-h-screen flex items-center justify-center border-gray-900/10 pb-12">
      {showSuccessAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-green-300 rounded-lg shadow-lg p-6 max-w-xl text-center">
            <h4 className="text-2xl font-medium mb-2">User created!</h4>
            <hr className="border-gray-300 my-4" />
            <p className="mb-0">
              You are ready to make your purchases!
            </p>
            <button
              className="mt-4 bg-blue-700 text-white rounded-md px-3 py-2 hover:bg-blue-500"
              onClick={() => setShowSuccessAlert(false)}
            >
              <Link href="/">Close and going home</Link>
            </button>
          </div>
        </div>
      )}
      <div className={!showSuccessAlert ? "block" : "hidden"}>
        <div className="max-w-xl mx-auto py-12">
          <div className="flex flex-col items-center">
            <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-800">User form</h1>
            <Formik
              initialValues={{
                name: '',
                lastname: '',
                email: '',
                password: '',
                image: null
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="mt-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm leading-6 font-semibold text-gray-800" htmlFor="name">Name: </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-800 " htmlFor="lastname">Lastname: </label>
                    <Field
                      type="text"
                      id="lastname"
                      name="lastname"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="lastname" component="div" className="text-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-800 " htmlFor="email">Email: </label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-800 " htmlFor="password">Password: </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="image" className="block text-sm font-semibold leading-6 text-gray-900">Profile image: </label>
                    <div className="mt-2" >
                      {/* ... */}
                      <div className='sm:col-span-2'>
                        <div>
                          <input
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                        <ErrorMessage name='image' component='div' className='text-red-600' />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-8">
                    <button
                      type="submit"
                      className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
