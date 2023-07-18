import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'GlobalRedux/api/productsApi';

interface FilterState {
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  filteredProducts: Product[];
}

const initialState: FilterState = {
  category: '',
  minPrice: null,
  maxPrice: null,
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number | null>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | null>) => {
      state.maxPrice = action.payload;
    },
    resetFilters: (state) => {
      state.category = '';
      state.minPrice = null;
      state.maxPrice = null;
      state.filteredProducts = [];
    },
    applyFilters: (state, action: PayloadAction<Product[]>) => {
      const { category, minPrice, maxPrice } = state;
      const filteredProducts = action.payload.filter((product) => {
        const meetsMinPrice = minPrice === null || parseFloat(product.price) >= minPrice;
        const meetsMaxPrice = maxPrice === null || parseFloat(product.price) <= maxPrice;
        const meetsCategory = category === '' || product.category === category;
        return meetsMinPrice && meetsMaxPrice && meetsCategory;
      });
      state.filteredProducts = filteredProducts;
    },
  },
});

export const { setCategory, setMinPrice, setMaxPrice, resetFilters, applyFilters } = filterSlice.actions;

export default filterSlice.reducer;
