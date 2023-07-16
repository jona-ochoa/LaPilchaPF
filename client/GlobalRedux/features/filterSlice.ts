import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
}

const initialState: FilterState = {
  category: '',
  minPrice: null,
  maxPrice: null,
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
    },
  },
});

export const { setCategory, setMinPrice, setMaxPrice, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;