import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProducts: () => {}
}
})


export const { getProducts }  = productsSlice.actions
export default productsSlice.reducer