import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isSuccess: false,
    error: ""
};

const buyProductsSlice = createSlice({
    name: "buyProducts",
    initialState,
    reducers: {
        buyProductsPending: (state) => {
            state.isLoading = true;
        },
        buyProductsSuccess: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.error = "";
        },
        buyProductsFail: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = payload;
        }
    }
});

export const { buyProductsPending, buyProductsSuccess, buyProductsFail } =
    buyProductsSlice.actions;

export default buyProductsSlice.reducer;
