import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../GlobalRedux/hooks";
import { useGetProductsQuery } from "../GlobalRedux/api/productsApi";
import { setProducts } from "../GlobalRedux/features/productsSlice";
import { Product } from "../GlobalRedux/api/productsApi";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading, isFetching } = useGetProductsQuery(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    console.log("Data:", data); // Verifica si los datos se reciben correctamente desde el backend
    if (data) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  if (isLoading || isFetching) {
    return <p>Cargando Productos...</p>;
  }

  if (error) {
    return <p>Error fetching products</p>;
  }

  const products = data as Product[];
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10">
        {currentProducts.map((product) => (
          <div key={product._id} className="product-card">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${
              currentPage === index + 1 ? "bg-gray-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

