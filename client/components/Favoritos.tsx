"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import {IconCart} from "./Icons"
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useLocalStorage } from '../hooks/useLocalstorage';
import { Product } from '../GlobalRedux/api/productsApi';
import { addToCarrito, removeFromCarrito } from "../GlobalRedux/features/carritoSlice"
import { addToFavorites, removeFromFavorites } from '../GlobalRedux/features/favoritoSlice';
import ProductCard from './ProductCard';

const FavoritosCards: React.FC = () => {      
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useLocalStorage<Product[]>('cartItems', []);
  const [favoriteItems, setFavoriteItems] = useLocalStorage<Product[]>("favoriteItems", []);
  const { data: session } = useSession();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteItems') || '[]');
    if (storedFavorites.length > 0) {
      storedFavorites.forEach((item: Product) => {
        dispatch(addToFavorites(item));
      });
    }
  }, [dispatch]);

  const handleRemoveFromFavorites = (_id: string) => {
    dispatch(removeFromFavorites(_id));
    const updatedFavorites = favoriteItems.filter((item) => item._id !== _id);
    setFavoriteItems(updatedFavorites);
  };

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
 
  

  if (!session) {
    return (
      <div className="w-full h-[500px] flex bg-gray-200 justify-center items-center text-center flex-col">
        <p className="text-4xl text-gray-800 font-bold font-mono mb-5">
          Debes iniciar sesión para ver tus favoritos
        </p>
        <Link
          href="/login"
          className="py-4 px-4 bg-gray-700 hover:bg-gray-200 text-gray-300 hover:text-gray-900 font-bold rounded-xl transition-colors"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }
  return (
    <div className="mt-8 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {!favoriteItems.length ? (
        <div className="mt-8 mb-8 flex justify-center items-center h-screen">
          <div className="text-center">
            <p className="text-gray-500 italic">No has seleccionado productos favoritos</p>
            <a href="/" className="mt-4 text-blue-500 hover:underline">Volver a comprar</a>
          </div>
        </div>
      ) : (
        favoriteItems.map((item: Product) => (
          <div key={item._id} className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
            <ProductCard product={item} />
            <button onClick={() => handleRemoveFromFavorites(item._id)} className="mt-4 text-3xl">
              ❤️
            </button>
            <button onClick={() => handleCartItem(item)} className="mt-4 text-3xl">
             <IconCart/>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritosCards;
