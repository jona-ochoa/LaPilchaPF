'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from 'GlobalRedux/features/usersSlice';
import { setProducts } from 'GlobalRedux/features/productsSlice';
import { useSession } from 'next-auth/react';
import { Product } from '../GlobalRedux/api/productsApi';
import { User } from '../GlobalRedux/api/usersApi';

import Image from 'next/image';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const fallbackImageSrc =
    'https://static.wikia.nocookie.net/lossimpson/images/5/55/Desconocido.png/revision/latest?cb=20150614004847&path-prefix=es';

  const [usersData, setUsersData] = useState<User[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);

  const { data: session } = useSession();
  const isAuthenticated = session;

  useEffect(() => {
    getUsersData();
    getProductsData();
  }, []);

  const getUsersData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/users');
      const users = response.data;
      dispatch(addUser(users));
      setUsersData(users);
    } catch (error) {
      console.error('Error al cargar los usuarios', error);
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/products');
      const products = response.data;
      dispatch(setProducts(products));
      setProductsData(products);
    } catch (error) {
      console.error('Error al cargar los productos', error);
    }
  };

  const handleToggleBanUser = async (userId: string, isBanned: boolean) => {
    try {
      const response = await axios.put(`http://localhost:3002/user/${userId}`, { isBanned });
      console.log(response.data.message);

      // Actualizar el estado local con el cambio realizado
      setUsersData((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? { ...user, isBanned } : user))
      );
    } catch (error) {
      console.error('Error al (des)banear al usuario', error);
    }
  };

  const handleToggleDeactivateProduct = async (productId: string, isDeactivated: boolean) => {
    try {
      const response = await axios.put(`http://localhost:3002/products/${productId}`, { isDeactivated });
      console.log(response.data.message);

      // Actualizar el estado local con el cambio realizado
      setProductsData((prevProducts) =>
        prevProducts.map((product) => (product._id === productId ? { ...product, isDeactivated } : product))
      );
    } catch (error) {
      console.error('Error al (des)activar el producto', error);
    }
  };

  const handleToggleAdmin = async (userId: string, isAdmin: boolean) => {
    try {
      const response = await axios.put(`http://localhost:3002/user/${userId}`, { isAdmin });
      console.log(response.data.message);

      // Actualizar el estado local con el cambio realizado
      setUsersData((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? { ...user, isAdmin } : user))
      );
    } catch (error) {
      console.error('Error al cambiar el estado del Admin', error);
    }
  };

  if (!isAuthenticated) {
    return <div>Debe ser un Usuario Administrador para poder ingresar al Panel</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Bienvenido <span className="text-pink-500 shadow-black">{session?.user?.name || '*'}</span>, Nuevamente al Panel
        de Administrador
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">
          <u>Lista de Usuarios:</u>
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {usersData.map((user: User) => (
            <div key={user._id} className={`p-4 border border-gray-200 rounded ${user.isBanned ? 'bg-red-200' : ''}`}>
              {user.image ? (
                <Image src={user.image} alt="Foto de perfil" width={50} height={50} className="rounded-full" />
              ) : (
                <Image src={fallbackImageSrc} alt="Foto de perfil no disponible" width={50} height={50} className="rounded-full" />
              )}
              <p className="font-semibold">Nombre:</p>
              <p>{user.name}</p>
              <p className="font-semibold">Apellido:</p>
              <p>{user.lastname}</p>
              <p className="font-semibold">Email:</p>
              <p>{user.email}</p>
              <p className="font-semibold">Password:</p>
              <p>{user.password}</p>
              <div className="relative mt-2">
                <p className="font-semibold">ADMIN:</p>
                <div className="flex items-center justify-center">
                  <span className="text-sm font-medium text-black dark:text-gray-900">NO</span>
                  <label className="relative inline-flex items-center ml-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={user.isAdmin}
                      onChange={() => handleToggleAdmin(user._id, !user.isAdmin)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                  <span className="text-sm font-medium text-black dark:text-gray-900 ml-2">SI</span>
                </div>
              </div>
              <button
                onClick={() => handleToggleBanUser(user._id, !user.isBanned)}
                className={`block mx-auto py-2 px-4 rounded mt-2 ${user.isBanned ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
              >
                {user.isBanned ? 'Desbanear' : 'Banear'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">
          <u>Lista de Productos:</u>
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {productsData.map((product: Product) => (
            <div
              key={product._id}
              className={`p-4 border border-gray-200 rounded ${product.isDeactivated ? 'bg-gray-200' : ''}`}
            >
              <Image src={product.image} alt="" width={300} height={200} className="object-cover mb-2" />
              <p className="font-semibold">{product.title}</p>
              <p className="text-gray-500">${product.price}</p>
              <button
                onClick={() => handleToggleDeactivateProduct(product._id, !product.isDeactivated)}
                className={`block mx-auto py-2 px-4 rounded mt-2 ${
                  product.isDeactivated ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                }`}
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
