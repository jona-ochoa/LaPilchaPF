

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BuyOrder } from "../api/buyOrderApi";

interface buyOrderState {
  orders: BuyOrder[];
}

const initialState: buyOrderState = {
    orders: []
};

export const buyOrdersSlice = createSlice({
  name: "buyOrders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<BuyOrder[]>) => {
      state.orders = action.payload;
    }},
  });


export const { setOrders } = buyOrdersSlice.actions;
export default buyOrdersSlice.reducer;
