import axios from "axios";
import { useEffect, useState } from "react";

import dotenv from "dotenv";

dotenv.config();

interface Order {
  _id: string;
  items: { title: string }[];
  total: number;
  createdAt: string;
  paymentType: string;
}

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http:localhost:3002";

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get<Order>(`${apiURL}/api/v1/orders/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details: ", error);
        setOrderDetails(null);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div>Cargando detalles de la orden...</div>;
  }

  return (
    <li>
      <h4>Detalles de la orden:</h4>
      <p>Productos: {orderDetails.items.map((product: any) => product.title).join(", ")}</p>
      <p>Monto: $ {orderDetails.total.toFixed(2)}</p>
      <p>Fecha: {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
      <p>Forma de Pago: {orderDetails.paymentType === "account_money" ? "Dinero en la cuenta" : "Otra forma de pago"}</p>
      <hr />
    </li>
  );
};

export default OrderDetails;
