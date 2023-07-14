import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../GlobalRedux/store';
import { addToFavorites, removeFromFavorites } from "../GlobalRedux/features/favoritoSlice";
import { Product } from '../GlobalRedux/api/productsApi';
import { useGetProductsQuery } from '../GlobalRedux/api/productsApi';
import { useAppDispatch } from '../GlobalRedux/store';
import { setProducts } from '../GlobalRedux/features/productsSlice';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const favoriteItems: Product[] = useSelector((state: RootState) => state.favoritos.items);
  const dispatch = useAppDispatch();
  const { data, error, isLoading, isFetching } = useGetProductsQuery(null);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    console.log("Data:", data);
    if (data) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  const handleFavorite = (item: Product) => {
    const existingItem = favoriteItems.find((_item) => _item._id === item._id);
    if (existingItem) {
      dispatch(removeFromFavorites(item._id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

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
      <div key={product._id} className="product-card relative">
        <ProductCard product={product} />
        <button 
          onClick={() => handleFavorite(product)}
          className="absolute top-2 right-7"
        >
          {favoriteItems.find(item => item._id === product._id) ? '❤️' : '🤍'}
        </button>
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


