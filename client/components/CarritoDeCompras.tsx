'use client'
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

  // Suma de los precios
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      {!cartItems.length ? (
        <p>No hay artículos en el carrito</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item: Product) => (
            <li key={item._id} className="border rounded-lg p-4 flex items-center space-x-4">
              <div>
                <img src={item.image} alt={item.title} style={{ width: '100px' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-700">Precio: ${item.price}</p>
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="inline-block bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg text-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Subtotal:</p>
          <p className="text-gray-700">${total}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping:</p>
          <p className="text-gray-700">$4.99</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total:</p>
          <div>
            <p className="mb-1 text-lg font-bold">${total + 4.99} USD</p>
            <p className="text-sm text-gray-700">incluyendo VAT</p>
          </div>
        </div>
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
          Check out
        </button>
      </div>
    </div>
  );
};

export default CarritoDeCompras;
