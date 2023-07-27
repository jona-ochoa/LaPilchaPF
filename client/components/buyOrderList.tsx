import { useGetOrdersQuery, BuyOrder } from 'GlobalRedux/api/buyOrderApi';
import React from 'react';

const BuyOrderList: React.FC = () => {

  const { data, error, isLoading, isFetching } = useGetOrdersQuery(null);

  if (isLoading) {
    return <div>Cargando...</div>; // Puedes mostrar un indicador de carga mientras se obtienen los datos.
  }

  if (error) {
    return <div>Error: error obteniendo las ordenes de compra</div>; // Si hay un error en la solicitud, muestra un mensaje de error.
  }

  if (!data || !data.length) {
    return <div>No hay órdenes de compra disponibles.</div>; // Si no hay datos o la lista está vacía, muestra un mensaje.
  }
  const ordersListData = data as BuyOrder[];
  const ordersList = ordersListData.slice().reverse();
  

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4">Historial de ordenes de compra</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ordersList.map((order: BuyOrder) => (
          <div key={order._id} className="bg-white shadow-lg rounded-md p-4 text-black">
            <p className="text-lg font-semibold mb-2">ID: {order._id}</p>
            <p className="text-sm mb-2">Estado: {order.status}</p>
            <p className="text-sm mb-2">Fecha de Creación: {order.createdAt}</p>
            <p className="text-sm mb-2">Total: ${order.total}</p>

            <div className="border-t mt-4 pt-4">
              <h3 className="text-lg font-semibold mb-2">Items de Compra:</h3>
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <p>{item.title}</p>
                  <p>Precio Unitario: ${item.unit_price}</p>
                  <p>Cantidad: {item.quantity}</p>
                  
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default BuyOrderList;
