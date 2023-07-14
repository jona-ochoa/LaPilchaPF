"use client"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../GlobalRedux/store';
import { removeFromFavorites } from '../GlobalRedux/features/favoritoSlice';
import { Product } from '../GlobalRedux/api/productsApi';

const TarjetasFavoritas = () => {
  const dispatch = useDispatch();
  const favoriteItems: Product[] = useSelector((state: RootState) => state.favoritos.items);

  const handleRemoveFromFavorites = (_id: string) => {
    dispatch(removeFromFavorites(_id));
  };

  return (
    <div>
      {!favoriteItems.length ? (
        <p>No hay productos favoritos.</p>
      ) : (
        favoriteItems.map((item: Product) => (
          <div key={item._id}>
            <span>{item.title}</span>
            <button onClick={() => handleRemoveFromFavorites(item._id)}>
              ❤️
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TarjetasFavoritas;
