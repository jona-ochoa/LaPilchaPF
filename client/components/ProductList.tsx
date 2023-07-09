//mapeo de cards para catálogo
"use client"

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "../src/GlobalRedux/hooks";

const ProductList = () => {

    useAppSelector(state => state.productsReducer.products)
    const dispatch = useAppDispatch();

    //paginado
    const productsPerPage = 8;
    const totalPages = Math.ceil(data.products.length / productsPerPage)
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const indexLastProduct = currentPage * productsPerPage;
    const indexFirstProduct = indexLastProduct - productsPerPage;
    const currentProducts = data.products.slice(indexFirstProduct, indexLastProduct) 

    return (
        <div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10" >
            { currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div> 

            
            <div className='flex justify-center mt-6'>
                {Array.from({length: totalPages}, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)} 
                    className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700' }`} >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
       
    )
}

export default ProductList;