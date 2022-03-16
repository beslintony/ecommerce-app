import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {},
    isLoading: false,
    error: ""
};

const singleProductSlice = createSlice({
    name: "singleProduct",
    initialState,
    reducers: {
        getSingleProductPending: (state) => {
            state.isLoading = true;
        },
        getSingleProductSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.product = payload;
            state.error = "";
        },
        getSingleProductFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }
});

export const { getSingleProductPending, getSingleProductFail, getSingleProductSuccess } =
    singleProductSlice.actions;

export default singleProductSlice.reducer;
