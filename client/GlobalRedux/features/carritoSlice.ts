

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../api/productsApi";

interface CarritoState {
  jwt: string | null,
  items: Product[];
}

const initialState: CarritoState = {
  items: [],
  jwt: null
};

export const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    removeFromCarrito: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    addToCarrito: (state, action: PayloadAction<Product> ) =>{
        state.items = state.items.concat(action.payload);
    },
    setCarrito: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    }
    },
  });



export const { removeFromCarrito, addToCarrito, setCarrito } = carritoSlice.actions;
export default carritoSlice.reducer;
