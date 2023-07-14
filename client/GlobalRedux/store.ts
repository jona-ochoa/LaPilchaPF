import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { productsApi } from './api/productsApi';
import productsReducer from "./features/productsSlice";
import { usersApi } from './api/usersApi';
import userSlice from './features/usersSlice';

const middleware = getDefaultMiddleware()
.concat(productsApi.middleware)
.concat(usersApi.middleware)

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    products: productsReducer,
    items: carritoReducer,
    user: userSlice,
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch<AppDispatch>();
