"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  removeFromCarrito,
  setCarrito,
} from "../GlobalRedux/features/carritoSlice";
import { Product } from "../GlobalRedux/api/productsApi";
import { useLocalStorage } from "hooks/useLocalstorage";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Item extends Product {
  count: number;
}

interface IMailerOrder {
  name: string;
  email: string;
  subject: string;
  buyOrder:
    | Array<{
        id: string;
        title: string;
        unit_price: string;
        quantity: number;
      }>
    | string;
}

const CarritoDeCompras = () => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useLocalStorage<Product[]>("cartItems", []);
  const [total, setTotal] = useState<number>(0);
  const dispatch = useDispatch();
  const [finalUser, setFinalUser] = useState<any | null>(null);
  let email = session?.user?.email ?? "";

  const searchBuyHistory = useCallback(
    async (email: string) => {
      try {
        const response = await axios.get("http://localhost:3002/users");
        const users = response.data;
        const user = users.find((user: any) => user.email === email);
        if (user) {
          setFinalUser(user);
        } else {
          setFinalUser(null);
        }
      } catch (error) {
        console.error("Error: ", error);
        setFinalUser(null);
      }
    },
    [email]
  );

  useEffect(() => {
    searchBuyHistory(email);
  }, [searchBuyHistory, email]);

  const handleRemoveFromCart = (_id: string) => {
    const updatedItems = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedItems);
    dispatch(removeFromCarrito(_id));
  };

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item: Item) => sum + Number(item.price) * item.count,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  const handleIncreaseCount = (_id: string) => {
    const updatedItems = cartItems.map((item: Item) =>
      item._id === _id ? { ...item, count: item.count + 1 } : item
    );
    setCartItems(updatedItems);
    dispatch(setCarrito(updatedItems));
  };

  const handleDecreaseCount = (_id: string) => {
    const updatedItems = cartItems.map((item: Item) =>
      item._id === _id && item.count > 1
        ? { ...item, count: item.count - 1 }
        : item
    );
    setCartItems(updatedItems);
    dispatch(setCarrito(updatedItems));
  };

  if (!session) {
    return (
      <div className="w-full h-[500px] flex bg-gray-200 justify-center items-center text-center flex-col">
        <p className="text-4xl text-gray-800 font-bold font-mono mb-5">
          Debes iniciar sesión para ver el carrito de compras
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

  const handlePayment = async (values: IMailerOrder) => {
    if (cartItems.length === 0) {
      console.log("No hay artículos en el carrito");
      return;
    }

    try {
      const buyerInfo = {
        name: session.user?.name,
        surname: finalUser._id,
        email: session.user?.email,
        buyOrder: cartItems.map((item: Item) => ({
          id: item._id,
          title: item.title,
          unit_price: item.price,
          quantity: item.count,
        })),
      };

      console.log(buyerInfo);

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
            <p className=" italic">No has agregado prendas al carrito</p>
            <a href="/" className="mt-4 text-blue-500 hover:underline">
              Volver a comprar
            </a>
          </div>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item: Item) => (
              <li
                key={item._id}
                className="border border-gray-300 shadow-sm rounded-md p-4 hover:bg-gray-600 text-center"
              >
                <div className="p-4 flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100px" }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm">Precio por unidad: ${item.price}</p>
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => handleDecreaseCount(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg text-sm mr-2"
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      onClick={() => handleIncreaseCount(item._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg text-sm ml-2"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="inline-block bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg text-sm mt-2"
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
            {/*  <div className="flex justify-between">
              <p className="text-gray-700">Shipping:</p>
              <p className="text-gray-700">$4.99</p>
            </div>*/}
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold text-gray-700">Total:</p>
              <div>
                <p className="mb-1 text-lg font-bold text-gray-700">
                  ${total.toFixed(2)} ARS
                </p>
                <p className="text-sm text-gray-700">*** incluye IVA</p>
              </div>
            </div>
            <button
              onClick={() =>
                handlePayment({
                  name: ``,
                  email: ``,
                  subject: ``,
                  buyOrder: [],
                })
              }
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Comprar!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoDeCompras;
