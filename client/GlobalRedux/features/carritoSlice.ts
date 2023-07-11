

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../api/productsApi";

interface CarritoState {
  items: Product[];
}

const initialState: CarritoState = {
  items: [],
  
};

export const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    removeFromCarrito: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    addToCarrito: (state, action: PayloadAction<Product> ) =>{
        state.items = state.items.concat(action.payload)
    }
    },
  });



export const { removeFromCarrito, addToCarrito } = carritoSlice.actions;
export default carritoSlice.reducer;
