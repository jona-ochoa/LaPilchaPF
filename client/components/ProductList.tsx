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
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10">
        {currentProducts.map((product) => (
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

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${
              currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'
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
