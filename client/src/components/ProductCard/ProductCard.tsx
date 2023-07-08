//card de productos

import React from "react";
import Link from 'next/link';

const ProductCard = ({product}) => {
    return(
        <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
        <Link href={`/products/${product.id}`}> 
            <div className="group aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 flex items-center" >
                <img src={product.image} alt={product.title} className="object-center h-50 w-50 group-hover:opacity-75" />
            </div>  
            <h3 className="mt-4 text-sm text-gray-700" > {product.title} </h3>
            <p className="mt-1 text-lg font-medium text-gray-900"> $ {product.price} </p>
        </Link>
        </div>
    )
}

export default ProductCard;