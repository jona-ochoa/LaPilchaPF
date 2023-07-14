"use client"

import React from "react";
import Link from "next/link";
import { Product } from "../GlobalRedux/api/productsApi";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center w-64 h-auto">
    <Link href={`/products/${product._id}`}>
      <div className="w-full overflow-hidden rounded-lg bg-gray-200 flex items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
    </Link>
  </div>
  
  

  );
};

export default ProductCard;
