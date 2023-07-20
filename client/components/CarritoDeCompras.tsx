"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../GlobalRedux/store";
import { removeFromCarrito } from "../GlobalRedux/features/carritoSlice";
import { Product } from "../GlobalRedux/api/productsApi";
import { useLocalStorage } from "hooks/useLocalstorage";
import { useSession } from "next-auth/react";
import axios from "axios";

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

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return <p>Debes iniciar sesión para ver el carrito de compras</p>;
  }

  // Suma de los precios
  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      console.log("No hay artículos en el carrito");
      return;
    }

    try {
      const buyerInfo = {
        name: session.user?.name,
        surname: session.user?.name,
        email: session.user?.email,
        buyOrder: cartItems.map((item) => ({
          id: item._id,
          title: item.title,
          unit_price: item.price,
          quantity: 1, // Cantidad de este artículo en la orden (puedes ajustarlo según tus necesidades)
        })),
      };

      // Hacer la solicitud al backend para crear la orden de compra en Mercado Pago
      const response = await axios.post(
        "http://localhost:3002/pay/create-order",
        buyerInfo
      );
      console.log("res del back: ", response.data);

      // Redirigir al usuario a la página de pago de Mercado Pago
      window.location.href = response.data.init_point;
    } catch (error) {
      console.error("Error al realizar el pago: ", error);
    }
  };

  return (
    <div className="mt-8 mb-8">
      {!cartItems.length ? (
        <div className="mt-8 mb-8 flex justify-center items-center h-screen">
          <div className="text-center">
            <p className="text-gray-500 italic">
              No has agregado prendas al carrito
            </p>
            <a href="/" className="mt-4 text-blue-500 hover:underline">
              Volver a comprar
            </a>
          </div>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item: Product) => (
              <li
                key={item._id}
                className="border border-gray-300 shadow-sm rounded-md p-4 hover:bg-gray-100 text-center"
              >
                <div className="p-4 flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100px" }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
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
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">Subtotal:</p>
              <p className="text-gray-700">${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping:</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total:</p>
              <div>
                <p className="mb-1 text-lg font-bold">
                  ${(total + 4.99).toFixed(2)} USD
                </p>
                <p className="text-sm text-gray-700">*** incluye IVA</p>
              </div>
            </div>
            <button
              onClick={handlePayment}
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoDeCompras;
