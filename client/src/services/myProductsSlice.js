import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: {},
    isLoading: false,
    error: ""
};

const myProductsSlice = createSlice({
    name: "singleProduct",
    initialState,
    reducers: {
        getMyProductsPending: (state) => {
            state.isLoading = true;
        },
        getMyProductsSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.products = payload;
            state.error = "";
        },
        getMyProductsFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }
});

export const { getMyProductsPending, getMyProductsFail, getMyProductsSuccess } =
    myProductsSlice.actions;

export default myProductsSlice.reducer;
