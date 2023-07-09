import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
     
}
})


export const {  }  = productsSlice.actions
export default productsSlice.reducer