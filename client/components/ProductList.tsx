import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../GlobalRedux/hooks";
import { Product } from '../GlobalRedux/api/productsApi';
import { useGetProductsByTitleQuery, useGetProductsQuery } from '../GlobalRedux/api/productsApi';
import { addToFavorites, removeFromFavorites } from "../GlobalRedux/features/favoritoSlice";
import { setProducts } from '../GlobalRedux/features/productsSlice';
import ProductCard from './ProductCard';
import { RootState } from '../GlobalRedux/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../GlobalRedux/store';
import { useLocalStorage } from '../hooks/useLocalstorage';
import toast from 'react-hot-toast';
import { addToCarrito, removeFromCarrito } from "../GlobalRedux/features/carritoSlice";
import { BsFillCartCheckFill, BsFillCartDashFill } from 'react-icons/bs';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const ProductList: React.FC = () => {
  const [favoriteItems, setFavoriteItems] = useLocalStorage<Product[]>('favoriteItems', []);
  const [cartItems, setCartItems] = useLocalStorage<Product[]>('cartItems', []);


  const dispatch = useAppDispatch();
  const searchQuery = useSelector((state: RootState) => state.searchQuery.query) as string;

  const { data, error, isLoading, isFetching } = searchQuery
  ? useGetProductsByTitleQuery({ title: searchQuery })
  : useGetProductsQuery(null);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data as Product[]));
    }
  }, [data, dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const allProducts: Product[] = useSelector((state: RootState) => state.products.products);
  const [filtrosProducts, setFiltrosProducts] = useState<Product[]>(allProducts);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: null,
    maxPrice: null
  });


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


  if (isLoading || isFetching) {
    return <p>Cargando Productos...</p>;
  }

  if (error) {
    return <p>Error fetching products</p>;
  }

  let filteredProducts = data
  

  useEffect(() => {
    let filtrosProducts = allProducts;
  
    if (filters.minPrice !== null && filters.minPrice !== '') {
      filtrosProducts = filtrosProducts.filter((product) => parseFloat(product.price) >= parseFloat(filters.minPrice!));
    }
  
    if (filters.maxPrice !== null && filters.maxPrice !== '') {
      filtrosProducts = filtrosProducts.filter((product) => parseFloat(product.price) <= parseFloat(filters.maxPrice!));
    }
  
    if (filters.category !== '') {
      filtrosProducts = filtrosProducts.filter((product) => product.category === filters.category);
    }
  
    setFiltrosProducts(filtrosProducts);
  }, [allProducts, filters]);


  const totalPages = Math.ceil((filteredProducts?.length ?? 0) / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10">
        {currentProducts?.map((product) => (
          <div key={product._id} className="product-card relative">
            <ProductCard product={product} />
            <div className="absolute top-2 right-7 flex flex-col bg-gray-200 p-1 rounded-sm">
              <button
                onClick={() => handleFavorite(product)}
                className=""
              >
                {favoriteItems.find((item) => item._id === product._id) ? <MdFavorite className="w-[25px] h-[25px] text-red-500 transition-transform" /> : <MdFavoriteBorder className="w-[25px] h-[25px] text-gray-800 transition-transform opacity-75" />}
              </button>
              <button
                onClick={() => handleCartItem(product)}
                className=""
              >
                {cartItems.find((item) => item._id === product._id) ? <BsFillCartCheckFill className="w-[25px] h-[25px] text-green-500 transition-transform" /> : <BsFillCartDashFill className="w-[25px] h-[25px] text-gray-800 transition-transform opacity-75" />}
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
            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? "bg-gray-600 text-white" : "bg-gray-300 text-gray-700"
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



