"use client"

import React from "react";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../GlobalRedux/api/productsApi";
import { Product } from '../GlobalRedux/api/productsApi';

const ProductList = () => {
    
  const { data, error, isLoading, isFetching } = useGetProductsQuery(null);
  if (isLoading || isFetching) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  const product = data as Product[];


  const productsPerPage = 8;
  const totalPages = Math.ceil(product.length / productsPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const indexLastProduct = currentPage * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const currentProducts = product.slice(indexFirstProduct, indexLastProduct)

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10">
        {currentProducts.map(product => (
          <div key={product.id} className="product-card">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-6'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductList;
