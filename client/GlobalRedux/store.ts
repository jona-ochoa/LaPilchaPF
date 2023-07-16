import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { productsApi } from './api/productsApi';
import { usersApi } from './api/usersApi';
import productsReducer from "./features/productsSlice";
import userSlice from './features/usersSlice';
import carritoReducer from "./features/carritoSlice"
import favoritosReducer from './features/favoritoSlice';
import searchQueryReducer from './features/searchQuerySlice';

const reducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  products: productsReducer,
  items: carritoReducer,
  favoritos: favoritosReducer,
  user: userSlice,
  [usersApi.reducerPath]: usersApi.reducer,
  searchQuery: searchQueryReducer,
});

const middleware = getDefaultMiddleware()
  .concat(productsApi.middleware)
  .concat(usersApi.middleware);

export const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch<AppDispatch>();
