'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery, User } from 'GlobalRedux/api/usersApi';
import { addUser } from 'GlobalRedux/features/usersSlice';
import { useGetProductsQuery, Product } from 'GlobalRedux/api/productsApi';
import { setProducts } from 'GlobalRedux/features/productsSlice';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';



const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();

  // Obtenemos los usuarios utilizando el hook useGetUsersQuery
  const { data: users, isLoading: isUsersLoading, isError: isUsersError } = useGetUsersQuery();

  // Obtenemos los productos utilizando el hook useGetProductsQuery
  const { data: products, isLoading: isProductsLoading, isError: isProductsError } = useGetProductsQuery();
  
  const fallbackImageSrc = 'https://static.wikia.nocookie.net/lossimpson/images/5/55/Desconocido.png/revision/latest?cb=20150614004847&path-prefix=es';
  
  useEffect(() => {
    // Si los datos de los usuarios son exitosos, los agregamos al estado del slice
    if (users) {
      dispatch(addUser(users));
    }
  }, [users, dispatch]);

  useEffect(() => {
    // Si los datos de los productos son exitosos, los establecemos en el estado del slice
    if (products) {
      dispatch(setProducts(products));
    }
  }, [products, dispatch]);

  const { data: session } = useSession();

  if (isUsersLoading || isProductsLoading) {
    return <div>Loading...</div>;
  }

  if (isUsersError || isProductsError) {
    return <div>Error al cargar los usuarios y/o productos</div>;
  }

  // Obtén el nombre del usuario logueado desde el estado o cualquier otra fuente
  const loggedInUserName = session?.user?.name || '*';

  // Verificar si el usuario está autenticado y es un administrador
  const isAuthenticated = session;

  if (!isAuthenticated) {
    return <div>Debe ser un Usuario Administrador para poder ingresar al Panel</div>;
  }


  const handleToggleBanUser = (userId: string) => {
    // Construir la URL para la ruta de banear usuario
    const url = `/api/users/user/${userId}`;

    // Enviar la solicitud PUT para banear al usuario
    axios
      .put(url, { isBanned: true })
      .then((response) => {
        // Manejar la respuesta si es necesario
        console.log(response.data); // Opcional: puedes mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.error("Error al banear al usuario", error);
      });
  };

  const handleToggleDeactivateProduct = (productId: string) => {
    // Construir la URL para la ruta de desactivar producto
    const url = `/api/products/${productId}`;

    // Enviar la solicitud PUT para desactivar el producto
    axios
      .put(url, { isDeactivated: true })
      .then((response) => {
        // Manejar la respuesta si es necesario
        console.log(response.data); // Opcional: puedes mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.error("Error al desactivar el producto", error);
      });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Bienvenido <span className="text-pink-500 shadow-black">{loggedInUserName}</span>, Nuevamente al Panel de Administrador</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2"><u>Lista de Usuarios:</u></h3>
        <div className="grid grid-cols-4 gap-4">
          {users?.map((user: User) => (
            <div key={user._id} className={`p-4 border border-gray-200 rounded ${user.isBanned ? 'bg-red-200' : ''}`}>
              {user.image ? (
              <Image
                  src={user.image}
                  alt="Foto de perfil"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={fallbackImageSrc}
                  alt="Foto de perfil no disponible"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                )}
              <p className="font-semibold">Nombre:</p>
              <p>{user.name}</p>
              <p className="font-semibold">Apellido:</p>
              <p>{user.lastname}</p>
              <p className="font-semibold">Email:</p>
              <p>{user.email}</p>
              <p className="font-semibold">Password:</p>
              <p>{user.password}</p>
              <button
                onClick={() => handleToggleBanUser(user._id)}
                className={`py-2 px-4 rounded mt-2 ${user.isBanned ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
              >
                {user.isBanned ? 'Desbanear' : 'Banear'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2"><u>Lista de Productos:</u></h3>
        <div className="grid grid-cols-4 gap-4">
          {products?.map((product: Product) => (
            <div
              key={product._id}
              className={`p-4 border border-gray-200 rounded ${product.isDeactivated ? 'bg-gray-200' : ''}`}
            >
              <img src={product.image} alt="" className="w-full h-40 object-contain mb-2" />
              <p className="font-semibold">{product.title}</p>
              <p className="text-gray-500">${product.price}</p>
              <button
                onClick={() => handleToggleDeactivateProduct(product._id)}
                className={`py-2 px-4 rounded mt-2 ${product.isDeactivated ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
              >
                {product.isDeactivated ? 'Activar' : 'Desactivar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;