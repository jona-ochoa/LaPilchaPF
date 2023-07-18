'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery, User } from 'GlobalRedux/api/usersApi';
import { addUser } from 'GlobalRedux/features/usersSlice';
import { useGetProductsQuery, Product } from 'GlobalRedux/api/productsApi';
import { setProducts } from 'GlobalRedux/features/productsSlice';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();

  // Obtenemos los usuarios utilizando el hook useGetUsersQuery
  const { data: users, isLoading: isUsersLoading, isError: isUsersError } = useGetUsersQuery();

  // Obtenemos los productos utilizando el hook useGetProductsQuery
  const { data: products, isLoading: isProductsLoading, isError: isProductsError } = useGetProductsQuery();

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

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Bienvenido <span className="text-pink-500 shadow-black">{loggedInUserName}</span>, Nuevamente al Panel de Administrador</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2"><u>Lista de Usuarios:</u></h3>
        <div className="grid grid-cols-4 gap-4">
          {users?.map((user: User) => (
            <div key={user._id} className="p-4 border border-gray-200 rounded">
              <Image src={user.image} alt="Foto de perfil" width={50} height={50} className="rounded-full" />
              <p className="font-semibold">Nombre:</p>
              <p>{user.name}</p>
              <p className="font-semibold">Apellido:</p>
              <p>{user.lastname}</p>
              <p className="font-semibold">Email:</p>
              <p>{user.email}</p>
              <p className="font-semibold">Password:</p>
              <p>{user.password}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2"><u>Lista de Productos:</u></h3>
        <div className="grid grid-cols-4 gap-4">
          {products?.map((product: Product) => (
            <div key={product._id} className="p-4 border border-gray-200 rounded">
              <img src={product.image} alt="" className="w-full h-40 object-contain mb-2" />
              <p className="font-semibold">{product.title}</p>
              <p className="text-gray-500">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
