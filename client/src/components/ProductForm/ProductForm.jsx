import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//estilos
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const ProductForm = () => {

    //estalo local momentáneo hasta tener los globales
    const [productPreview, setProductPreview] = useState(null);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(<span>Product name is required <FontAwesomeIcon icon={faCircleExclamation} beat style={{color: "#63728c", paddingLeft: '.5rem'}} /></span>),
        price: Yup.string().required(<span>Product price is required <FontAwesomeIcon icon={faCircleExclamation} beat style={{color: "#63728c", paddingLeft: '.5rem'}} /> </span>),
        description: Yup.string().required(<span>Product description is required <FontAwesomeIcon icon={faCircleExclamation} beat style={{color: "#63728c", paddingLeft: '.5rem'}} /> </span>),
        category: Yup.string().required(<span>The product category is required <FontAwesomeIcon icon={faCircleExclamation} beat style={{color: "#63728c", paddingLeft: '.5rem'}} /> </span>),
        image: Yup.mixed().required('Product image is required').test('fileType', 'The file must be an image', value => {
            if(!value) return true;
            return value && ['image/jpeg', 'image/png'].includes(value.type)
        })
    })

    const handleInputChange = (event, setFieldValue) => {
        const { name, value } = event.target;
        setFieldValue(name, value);
            setProductPreview((prevPreview) => ({
                ...prevPreview,
                [name]: value,
            }))
    }

    //momentáneamente solo es una vista previa hasta tener los estados de redux
    const handleSubmit = (values) => {
        setProductPreview({
            title: values.title,
            price: values.price,
            description: values.description,
            category: values.category,
            image: productPreview ? productPreview.image : null,
        })
    }

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        setFieldValue('image', file)
    //leer el contenido del archivo y generar una url de obj
    const reader = new FileReader();
    reader.onload = (e) => {
        setProductPreview((prevState) => ({
            ...prevState,
            image: e.target.result,
        }));
    }
    reader.readAsDataURL(file)
}

    return (
        <div className="flex justify-center items-center isolate bg-white px-6 py-24 sm:py-32 lg:px-8" >
        <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="flex justify-center">
        <div className="max-w-lg">
            <div className="p-6">
                <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl pb-10">Create product</h2>
            </div> 
        <Formik initialValues={{
            title: '',
            price: '',
            description: '',
            category: '',
            image: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
            setProductPreview(values);
            setSubmitting(false)
        }} 
        >
        
        {({ setFieldValue}) => (
            <Form className="max-w-xl mx-auto" >

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2" >
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900" htmlFor="title" >Product name: </label>
                    <div className="mt-2.5">
                    <Field className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6' type='text' id='title' name='title' onChange={(e) => handleInputChange(e, setFieldValue)} />
                    </div>
                    <ErrorMessage name="title" component='div' className="text-red-600" />
                </div>

                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900" htmlFor="price">Price: </label>
                    <div className="mt-2.5">
                    <Field  type='text' id='price' name='price' className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" onChange={(e) => handleInputChange(e, setFieldValue)}/>
                    </div>
                    <ErrorMessage name="price" component='div' className="text-red-600"/>
                    
                </div>

                <div className="sm:col-span-2" >
                    <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">Description: </label>
                    <div className="mt-2.5">
                    <Field type='text' id='description' name='description' className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => handleInputChange(e, setFieldValue)}/>
                    </div>
                    <ErrorMessage name="description" component='div' className="text-red-600"/>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="category" className="block text-sm font-semibold leading-6 text-gray-900">Category: </label>
                    <div className="mt-2.5">
                    <Field as='select' id='category' name='category' className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => handleInputChange(e, setFieldValue)}>
                    <option value='' >Select a category: </option>
                    <option value="women's clothing" >women's clothing</option>
                    <option value="men's clothing" >men's clothing</option>
                    </Field>
                    </div>
                    <ErrorMessage name="category" component='div' className="text-red-600" />
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="image" className="block text-sm font-semibold leading-6 text-gray-900">Product image: </label>
                    <div className="'mt-2.5">
                    <input type='file' id='image' name='image' accept='image/*' className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => handleFileChange(e, setFieldValue)}/>
                    </div>
                    <ErrorMessage name="image" component='div' className="text-red-600" />
                </div>
            </div>
                
                <div className="mt-10">
                <button type="submit" className="block w-full rounded-md bg-blue-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Publish product!</button>
                </div>
            </Form>
        )}
    </Formik>

            </div>
        </div>
      </div>
            
        {
            productPreview && (
                <div className="flex items-center justify-center">
                <div className="'max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-250 ">
                    <div className="p-10">
                      <h2 className="mb-2 text-sm font-bold tracking-tight text-gray-900 " >Product preview:</h2>
                <div className="flex justify-center">
                    <img className="rounded-xl mt-2" src={productPreview.image} alt={productPreview.title}/>
                </div>
                    <div className="p-5">
                        <h5 className="mb-1 font-normal text-gray-800" > {productPreview.title} </h5>
                        <p className="mb-1 font-normal text-gray-800">Price: ${productPreview.price} </p>
                        <p className="mb-1 font-normal text-gray-800">Description: {productPreview.description}</p>
                        <p className="mb-1 font-normal text-gray-800">Category: {productPreview.category} </p>
                    </div>
                </div>
                </div>  
                    </div>
                    
            )
        }
        </div>
        
    );
}

export default ProductForm;