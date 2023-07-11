"use client"

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../GlobalRedux/store';
import { removeFromCarrito } from '../GlobalRedux/features/carritoSlice';
import { Product } from '../GlobalRedux/api/productsApi'; 

interface Item {
 items: Product[]
}

 const CarritoDeCompras = () => {
  const dispatch = useDispatch();
  const cartItems: Item = useSelector((state: RootState) => state.items);

  const handleRemoveFromCart = (_id: string) => {
    dispatch(removeFromCarrito(_id));
  };
  return (

    <div>
      <h2>Carrito de compras</h2>
      {!cartItems? (
        <p>No hay artículos en el carrito</p>
      ) : (
        <ul>
          {cartItems.items.map((item: Product) => ( // Ajusta el tipo a Product
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
