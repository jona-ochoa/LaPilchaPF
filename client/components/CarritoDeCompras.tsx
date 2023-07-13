"use client"

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../GlobalRedux/store';
import { removeFromCarrito } from '../GlobalRedux/features/carritoSlice';
import { Product } from '../GlobalRedux/api/productsApi'; 
import { useLocalStorage } from 'hooks/useLocalstorage';
import { useSession } from 'next-auth/react';


interface Item extends Product {}

 const CarritoDeCompras = () => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useLocalStorage<Product[]>("cartItems", []);
  const dispatch = useDispatch();
  

  const handleRemoveFromCart = (_id: string) => {
    const updatedItems = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedItems);
    dispatch(removeFromCarrito(_id));
  };

  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return <p>Debes iniciar sesión para ver el carrito de compras</p>;
  }


  return (

    <div>
      <h2>Carrito de compras</h2>
      {!cartItems.length ? (
  <p>No hay artículos en el carrito</p>
) : (
  <ul>
    {cartItems.map((item: Product) => (
      <li key={item._id}>
        <span>{item.title}</span>
        <button onClick={() => handleRemoveFromCart(item._id)}>
          Eliminar
        </button>
      </li>
    ))}
  </ul>
)}
    </div>
  );
};

export default CarritoDeCompras;
