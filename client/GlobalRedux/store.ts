import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { productsApi } from './api/productsApi';
import productsReducer from "./features/productsSlice";
import carritoReducer from "./features/carritoSlice"
import favoritosReducer from './features/favoritoSlice';

const middleware = getDefaultMiddleware().concat(productsApi.middleware);

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    products: productsReducer,
    items: carritoReducer,
    favoritos: favoritosReducer
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch<AppDispatch>();

