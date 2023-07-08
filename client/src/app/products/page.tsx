
import React from "react";
import ProductList from "../../components/ProductList";

const ProductsPage = () => {
    return (
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8" >
        <div className="bg-gray-100 p-2 pt-10 m-5">
        <h1 className="text-6xl font-bold text-center mb-8">Products</h1> 
        </div>
            <ProductList />
        </div>
    )
}

export default ProductsPage;