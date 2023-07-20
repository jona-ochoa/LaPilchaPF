import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../GlobalRedux/store';
import { setProducts } from '../GlobalRedux/features/productsSlice';
import { setCategory, setMinPrice, setMaxPrice, applyFilters } from '../GlobalRedux/features/filterSlice';
import { useAppDispatch } from '../GlobalRedux/hooks';
import ProductCard from './ProductCard';
import { addToFavorites, removeFromFavorites } from '../GlobalRedux/features/favoritoSlice';
import { useGetProductsByTitleQuery, useGetProductsQuery, Product } from '../GlobalRedux/api/productsApi';
import { addToCarrito, removeFromCarrito } from '../GlobalRedux/features/carritoSlice';
import { useLocalStorage } from '../hooks/useLocalstorage';
import toast from 'react-hot-toast';
import { BsFillCartCheckFill, BsFillCartDashFill } from 'react-icons/bs';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();

  const searchQuery: string = useSelector((state: RootState) => state.searchQuery.query);

  const allProducts: Product[] = useSelector((state: RootState) => state.products.products);
  const { category, minPrice, maxPrice } = useSelector((state: RootState) => state.filter);

  const [favoriteItems, setFavoriteItems] = useLocalStorage<Product[]>('favoriteItems', []);
  const [cartItems, setCartItems] = useLocalStorage<Product[]>('cartItems', []);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  const productsPerPage = 8;

  const { data, error, isLoading, isFetching } = searchQuery
    ? useGetProductsByTitleQuery({ title: searchQuery })
    : useGetProductsQuery(null);

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data as Product[]));
    }
  }, [data, dispatch]);

  const handleCartItem = (item: Product) => {
    const existingItemCarrito = cartItems.find((_item) => _item._id === item._id);

    if (existingItemCarrito) {
      dispatch(removeFromCarrito(item._id));
      const updatedCarrito = cartItems.filter((carrito) => carrito._id !== item._id);
      setCartItems(updatedCarrito);
      toast.error('Eliminado del Carrito.');
    } else {
      dispatch(addToCarrito(item));
      setCartItems([...cartItems, item]);
      toast.success('Agregado al Carrito.');
    }
  };

  const handleFavorite = (item: Product) => {
    const existingItem = favoriteItems.find((_item) => _item._id === item._id);
    if (existingItem) {
      dispatch(removeFromFavorites(item._id));
      const updatedFavorites = favoriteItems.filter((favorite) => favorite._id !== item._id);
      setFavoriteItems(updatedFavorites);
      toast.error('Eliminado de Favoritos');
    } else {
      dispatch(addToFavorites(item));
      setFavoriteItems([...favoriteItems, item]);
      toast.success('Agregado a Favoritos');
    }
  };

  useEffect(() => {
    let filteredProducts = allProducts;

    if (category !== '') {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    if (minPrice !== null) {
      filteredProducts = filteredProducts.filter((product) => product.price >= minPrice.toString());
    }

    if (maxPrice !== null) {
      filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice.toString());
    }

    setFilteredProducts(filteredProducts);
    setCurrentPage(1);
  }, [allProducts, category, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterProducts = () => {
    dispatch(applyFilters(allProducts));
  };

  return (
    <div>
      {isLoading ? (

        <div role="status" className="flex flex-col text-center justify-center">
          <svg aria-hidden="true" className="w-[100px] h-[100px] mx-auto text-center text-gray-900 animate-spin dark:text-gray-200 fill-gray-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <h3 className="text-gray-900 font-bold text-5xl my-5">Loading...</h3>
        </div>

      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10">
          {currentProducts
          .filter((product) => !product.isDeactivated)
          .map((product) => (
            <div key={product._id} className="product-card relative">
              <ProductCard product={product} />
              <div className="absolute top-2 right-7 flex flex-col bg-gray-200 p-1 rounded-sm">
                <button onClick={() => handleFavorite(product)} className="">
                  {favoriteItems.find((item) => item._id === product._id) ? (
                    <MdFavorite className="w-[25px] h-[25px] text-red-500 transition-transform" />
                  ) : (
                    <MdFavoriteBorder className="w-[25px] h-[25px] text-gray-800 transition-transform opacity-75" />
                  )}
                </button>
                <button onClick={() => handleCartItem(product)} className="">
                  {cartItems.find((item) => item._id === product._id) ? (
                    <BsFillCartCheckFill className="w-[25px] h-[25px] text-green-500 transition-transform" />
                  ) : (
                    <BsFillCartDashFill className="w-[25px] h-[25px] text-gray-800 transition-transform opacity-75" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'
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
