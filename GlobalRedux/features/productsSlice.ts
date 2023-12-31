import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../api/productsApi";

interface ProductsState {
products: Product[];
activatedProducts: Product[];
filteredProducts: Product[]; // Agregar lista de productos filtrados
}

const initialState: ProductsState = {
products: [],
activatedProducts: [],
filteredProducts: [], // Inicializar lista de productos filtrados
};

export const productsSlice = createSlice({
name: "products",
initialState,
reducers: {
  setProducts: (state, action: PayloadAction<Product[]>) => {
    state.products = action.payload;
    state.activatedProducts = action.payload.filter((product) => !product.isDeactivated);
    state.filteredProducts = action.payload; // Actualizar la lista de productos filtrados
  },
  updateActivatedProducts: (state) => {
    state.activatedProducts = state.products.filter((product) => !product.isDeactivated);
  },
  updateProductRating: (state, action: PayloadAction<{productId: string ; newRating: number}>) => {
    const {productId, newRating} = action.payload;
    const productToUpdate = state.products.find((p) => p._id === productId);
    if(productToUpdate) {
      productToUpdate.rating.push({ rate: newRating, count: 1})
    }
  }
},
});

export const selectProducts = (state: RootState) => state.products.filteredProducts; // Usar la lista de productos filtrados en el selector

export const { setProducts, updateProductRating } = productsSlice.actions;

export default productsSlice.reducer;

