'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../GlobalRedux/store';
import { removeFromFavorites, addToFavorites } from '../GlobalRedux/features/favoritoSlice';
import { Product } from '../GlobalRedux/api/productsApi';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalstorage';
import ProductCard from './ProductCard';

const TarjetasFavoritas = () => {
  const [favoriteItems, setFavoriteItems] = useLocalStorage<Product[]>("favoriteItems", []);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteItems') || '[]');
    if (storedFavorites.length > 0) {
      storedFavorites.forEach((item: Product) => {
        dispatch(addToFavorites(item));
      });
    }
  }, [dispatch]);

  const handleRemoveFromFavorites = (_id: string) => {
    dispatch(removeFromFavorites(_id));
    const updatedFavorites = favoriteItems.filter((item) => item._id !== _id);
    setFavoriteItems(updatedFavorites);
  };

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return <p>Debes iniciar sesión para ver los productos favoritos</p>;
  }

  return (
    <div className="mt-8 mb-8">
        {!favoriteItems.length ? (
          <div className="mt-8 mb-8 flex justify-center items-center h-screen">
    <div className="text-center">
      <p className="text-gray-500 italic">No has seleccionado productos favoritos</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">Volver a comprar</a>
    </div>
  </div>
  
       
          
        ) : (
          favoriteItems.map((item: Product) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            
            
            <div key={item._id} className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
              <ProductCard product={item} />
             
             
              <button
  onClick={() => handleRemoveFromFavorites(item._id)}
  className="mt-4 text-3xl"
>
  ❤️
</button>
            </div>
      </div>
          ))

        )
        
        }
    </div>
  );
};

export default TarjetasFavoritas;