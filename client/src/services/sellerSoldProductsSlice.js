import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    soldProducts: {},
    error: ""
};

const sellerSoldProductsSlice = createSlice({
    name: "sellerSoldProducts",
    initialState,
    reducers: {
        sellerSoldProductsPending: (state) => {
            state.isLoading = true;
        },
        sellerSoldProductsSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.soldProducts = payload;
            state.error = "";
        },
        sellerSoldProductsFail: (state, { payload }) => {
            state.isLoading = false;
            state.soldProducts = false;
            state.error = payload;
        }
    }
});

export const { sellerSoldProductsPending, sellerSoldProductsSuccess, sellerSoldProductsFail } =
    sellerSoldProductsSlice.actions;

export default sellerSoldProductsSlice.reducer;
