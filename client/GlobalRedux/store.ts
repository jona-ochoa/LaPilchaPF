import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { productsApi } from './api/productsApi';
import { usersApi } from './api/usersApi';
import { buyOrderApi } from './api/buyOrderApi';
import { nodemailerApi } from './api/nodemailerApi';
import productsReducer from "./features/productsSlice";
import mailerSlice from "./features/nodemailerSlice";
import userSlice from './features/usersSlice';
import carritoReducer from "./features/carritoSlice"
import favoritosReducer from './features/favoritoSlice';
import searchQueryReducer from './features/searchQuerySlice';
import filterReducer from './features/filterSlice';
import { nodemailerOrder } from './api/nodemailerOrder';
import mailerOrderSlice from './features/mailerOrderSlice';
import buyOrdersReducer from './features/buyOrdersSlice'; 
import { nodemailerRegister } from './api/nodemailerRegister';
import nodemailerRegisterSlice from './features/nodemailerRegisterSlice';

const reducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [buyOrderApi.reducerPath]: buyOrderApi.reducer,
  [nodemailerApi.reducerPath]: nodemailerApi.reducer,
  [nodemailerOrder.reducerPath]: nodemailerOrder.reducer,
  [nodemailerRegister.reducerPath]: nodemailerRegister.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  products: productsReducer,
  orders: buyOrdersReducer,
  items: carritoReducer,
  favoritos: favoritosReducer,
  user: userSlice,
  mailer: mailerSlice,
  mailerOrder: mailerOrderSlice,
  nodemailers: nodemailerRegisterSlice,
  searchQuery: searchQueryReducer,
  filter: filterReducer
});

const middleware = getDefaultMiddleware()
  .concat(productsApi.middleware)
  .concat(usersApi.middleware)
  .concat(buyOrderApi.middleware)
  .concat(nodemailerApi.middleware)
  .concat(nodemailerOrder.middleware)
  .concat(nodemailerRegister.middleware)
  
export const store = configureStore({

  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch<AppDispatch>();