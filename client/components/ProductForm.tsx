"use client"
import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface Product {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string | null;
}

const ProductForm: React.FC = () => {
    const [productPreview, setProductPreview] = useState<Product | null>(null);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Product name is required'),
        price: Yup.number().required('Product price is required'),
        description: Yup.string().required('Product description is required'),
        category: Yup.string().required('The product category is required'),
        image: Yup.mixed().required('Product image is required').test('fileType', 'The file must be an image', function (value: any) {
            if(!value) return true;
            const fileType = value && value.type;
            const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if(fileType) {
                return validFileTypes.includes(fileType)
            }
            return false;
        }),
    });

    const handleInputChange = ( event: React.ChangeEvent<HTMLInputElement>, setFieldValue: Function) => {
        const { name, value } = event.target;
        setFieldValue(name, value);
        setProductPreview((prevPreview: Product | null) => ({
           ...(prevPreview as Product),
           [name]: value, 
        }));
    };

    const handleSubmit = (values: Product) => {
        setProductPreview(values)
    };

    const handleFileChange = ( event: React.ChangeEvent<HTMLInputElement>, setFieldValue: Function) => {
        const file = event.currentTarget.files?.[0];
        setFieldValue('image', file);

        const reader = new FileReader();
        reader.onload = ( e: ProgressEvent<FileReader>) => {
            setProductPreview((prevState: Product | null) => ({
                ...(prevState as Product),
                image: e.target?.result as string,
            }));
        };
        reader.readAsDataURL(file as File)
    }

    return (
        <div className='flex justify-center items-center isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
            <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true"'>
            <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>

            <div className='flex justify-center'>
                <div className='max-w-lg'>
                    <div className='p-6'>
                        <div className='mx-auto max-w-2xl text-center'>
                            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl pb-10'>Create product</h2>
                        </div>

                        <Formik initialValues={{
                            title: '',
                            price: 0,
                            description: '',
                            category: '',
                            image: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            handleSubmit(values);
                            setSubmitting(false)
                        }} >  

                        {({ setFieldValue }) => (
                            <Form className='max-w-xl mx-auto'>
                                <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>

                                    <div>
                                        <label className='block text-sm font-semibold leading-6 text-gray-900' htmlFor='title'>Product name:</label>
                                        <div className='mt-2.5'>
                                            <Field className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6' 
                                            type='text' id='title' name='title' onChange={(e) => handleInputChange(e, setFieldValue)} />
                                            <ErrorMessage name='title' component='div' className='text-red-600' />
                                        </div>
                                    </div>

                                    <div>
                                        <label className='block text-sm font-semibold leading-6 text-gray-900' htmlFor='price'>Price:</label>
                                        <div className='mt-2.5'>
                                        <Field type='number' id='price' name='price' onChange={(e) => handleInputChange(e, setFieldValue)} placeholder='$'
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
                                        </div>
                                        <ErrorMessage name='price' component='div' className='text-red-600' />
                                    </div>

                                    <div className='sm:col-span-2'>
                                        <label className='block text-sm font-semibold leading-6 text-gray-600' htmlFor='description'>Description: </label>
                                        <div className='mt-2.5'>
                                            <Field type='text' id='description' name='description' onChange={(e) => handleInputChange(e, setFieldValue)}
                                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6' />
                                        </div>
                                        <ErrorMessage name='description' component='div' className='text-red-600' />
                                    </div>

                                    <div className='sm-col-span-2'>
                                        <label className='block text-sm font-semibold leading-6 text-gray-600' htmlFor='category'>Category: </label>
                                        <div className='mt-2.5'>
                                            <Field as='select' id='category' name='category' onChange={(e) => handleInputChange(e, setFieldValue)}
                                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                                                <option value=''></option>
                                                <option value="women's clothing"> women's clothing</option>
                                                <option value="men's clothing"> men's clothing</option>
                                            </Field>
                                        </div>
                                    </div>

                                    <div className='sm:col-span-2'>
                                        <label htmlFor='image' className='block text-sm font-semibold leading-6 text-gray-600'>Product image:</label>
                                        <div>
                                            <input type='file' id='image' name='image' accept='image/*' onChange={(e) => handleFileChange(e, setFieldValue)}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                        <ErrorMessage name='image' component='div' className='text-red-600' />
                                    </div>
                                </div>

                                <div className='mt-10'>
                                    <button type='submit' className='block w-full rounded-md bg-blue-800 px-3.5 py-2.5 text-center tetx-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Publish product!</button>
                                </div>
                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>

            {/* vista previa del producto */}
            { productPreview && (
                <div className='flex items-center justify-center'>
                    <div className='max-w-xs bg-white border border-gray-200 rounded-lg shadow'>
                        <div className='p-10'>
                            <h2 className='mb-2 text-sm font-bold tracking-tight text-gray-900'>Product preview: </h2>
                            <div>
                                <img className='rounded-xl mt-2' src={productPreview.image || ''} alt={productPreview.title} />
                            </div>
                            <div className='p-5'>
                                <h5 className='mb-1 font-normal text-gray-800'> {productPreview.title} </h5>
                                <p className='mb-1 font-normal text-gray-800'>Price: $ {productPreview.price} </p>
                                <p className='mb-1 font-normal text-gray-800'>Description: {productPreview.description} </p>
                                <p className='mb-1 font-normal text-gray-800'>Category: {productPreview.category} </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}


export default ProductForm;
