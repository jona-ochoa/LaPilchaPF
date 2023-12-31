"use client";

import Link from "next/link";
import Image from "next/image";
import logoanimado from "../../public/LaPilcha_animada.gif";
import React, { useEffect, useState } from "react";
import { setCarrito } from "../../GlobalRedux/features/carritoSlice";
import { Product } from "../../GlobalRedux/api/productsApi";
import { useLocalStorage } from "hooks/useLocalstorage";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  useCreateMailerOrderMutation,
  MailerOrder,
} from "GlobalRedux/api/nodemailerOrder";
import { addMailerOrder } from "GlobalRedux/features/mailerOrderSlice";
import dotenv from "dotenv";

dotenv.config();

interface Item extends Product {
  count: number;
}

const ThankYouPage = () => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useLocalStorage<Product[]>("cartItems", []);
  const dispatch = useDispatch();
  const [finalUser, setFinalUser] = useState<any | null>(null);
  const [createMailerOrderMutation, { data }] = useCreateMailerOrderMutation();
  const [orderCreated, setOrderCreated] = useState(false);
  const [ejecutado, setEjecutado] = useState(false);

  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/v1/users`);
        const users = response.data;
        const user = users.find(
          (user: any) => user.email === session.user?.email
        );
        if (user) {
          setFinalUser(user);
        } else {
          setFinalUser(null);
        }
      } catch (error) {
        console.error("Error: ", error);
        setFinalUser(null);
      }
    };

    fetchData();
  }, [session]);
  //dependencia session ahi arriba

  const handleBuyOrder = async () => {
    if (cartItems.length === 0 || !session || !finalUser) {
      console.log("No hay artículos en el carrito o sesión inválida");
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

    try {
      const buyerInfo = {
        name: session.user?.name,
        surname: finalUser._id,
        email: session.user?.email,
        buyOrder: cartItems.map((item) => ({
          id: item._id,
          title: item.title,
          unit_price: item.price,
          quantity: 1,
        })),
      };

      const buyOrder = {
        status: "created",
        total: total,
        items: cartItems.map((item) => ({
          id: item._id,
          title: item.title,
          unit_price: item.price,
          quantity: 1,
        })),
        userId: finalUser._id,
      };

      const newBuyOrder = await axios.post(
        // "http://localhost:3002/orders",
        `${apiURL}api/v1/orders`,
        buyOrder
      );

      if ("data" in newBuyOrder) {
        const { data } = newBuyOrder;
        const jsonData = JSON.stringify(data);
        dispatch(addMailerOrder(data));
        toast.success("Orden de compra creada con éxito");
      }

      const orderDetailsHTML = `<table>
      <thead>
        <tr>
          <th>Item ID</th>
          <th>Title</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${buyOrder.items
          .map(
            (item) => `
            <tr>
              <td>${item.id}</td>
              <td>${item.title}</td>
              <td>${item.unit_price}</td>
              <td>${item.quantity}</td>
            </tr>
          `
          )
          .join("")}
          </tbody>
          <tbody>
          <th>
          ${buyOrder.total}
          </th>
          </tbody>
    </table>`;

      const newMailerOrder: Partial<MailerOrder> = {
        name: `${buyerInfo.name}`,
        email: `${buyerInfo.email}`,
        subject: `Order de compra del cliente: ${buyerInfo.name}`,
        buyOrder: orderDetailsHTML,
      };

      const result = await createMailerOrderMutation(newMailerOrder);

      if ("data" in result) {
        const { data } = result;
        const jsonData = JSON.stringify(data);
        dispatch(addMailerOrder(data));
        toast.success("Mensaje de la orden de compra enviado con éxito");
      }

      setOrderCreated(true);
    } catch (error) {
      console.error("Error al realizar el pago: ", error);
    }
  };
  /*
  useEffect(() => {
    if (!session || cartItems.length === 0) return;
    if (!orderCreated) {
      handleBuyOrder();
    }
  }, [finalUser]);*/

  useEffect(() => {
    if (finalUser && !ejecutado) {
      if (!session || cartItems.length === 0) return;
      if (!orderCreated) {
        handleBuyOrder();
      }
      setEjecutado(true);
    }
  }, [finalUser]);
  //dependencia session ahi arriba

  // useEffect(() => {
  //     setCartItems([]);
  //     dispatch(setCarrito([]));
  //   }, []);

  useEffect(() => {
    if (orderCreated) {
      // Limpiar el carrito de compras (establecerlo como un array vacío) cuando el componente se monta
      setCartItems([]);
      dispatch(setCarrito([]));
    }
  }, [orderCreated]);

  return (
    <div className="flex flex-col justify-center justify-items-center py-1.5">
      <div className="flex flex-row flex-wrap justify-center justify-items-center mx-2.5">
        <div
          className="w-1/4"
          style={{ textAlign: "center", margin: "20px 0" }}
        >
          <Image
            src={logoanimado}
            alt="La Pilcha"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="w-auto flex flex-col flex-wrap justify-center justify-items-center text-5xl mx-8 py-3.5 font-semibold">
          <h2>Gracias por elegirnos!</h2>
          <h3 className="mt-3.5">Compra realizada con éxito.</h3>
        </div>
      </div>
      <Link
        href="/products"
        className="mx-auto m-3 w-44 h-20 mt-6  rounded-md bg-blue-500 py-2.5 text-lg font-medium text-blue-50 hover:bg-blue-600 flex justify-center items-center"
      >
        <button>Seguir comprando</button>
      </Link>
    </div>
  );
};

export default ThankYouPage;
