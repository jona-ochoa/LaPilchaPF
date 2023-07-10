"use client"

import React, { useEffect } from "react";
import { useAppDispatch} from "../GlobalRedux/hooks";
import { useGetProductsQuery } from "../GlobalRedux/api/productsApi";
import { setProducts, selectProducts } from "../GlobalRedux/features/productsSlice";
import { useSelector } from 'react-redux';
import { RootState } from "../GlobalRedux/store";
import { Product } from "../GlobalRedux/api/productsApi";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading, isFetching } = useGetProductsQuery(null);
  const products = useSelector(selectProducts); // Utiliza el selector para obtener los productos del estado

  useEffect(() => {
    console.log("Data:", data); // Verifica si los datos se reciben correctamente desde el backend
    if (data) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10">
        {products.map((product: Product) => (
          <div key={product.id} className="product-card">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;



