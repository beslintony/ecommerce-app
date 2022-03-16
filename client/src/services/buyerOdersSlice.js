import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    orders: {},
    error: ""
};

const buyerOrdersSlice = createSlice({
    name: "buyerOrders",
    initialState,
    reducers: {
        buyerOrdersPending: (state) => {
            state.isLoading = true;
        },
        buyerOrdersSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.orders = payload;
            state.error = "";
        },
        buyerOrdersFail: (state, { payload }) => {
            state.isLoading = false;
            state.orders = false;
            state.error = payload;
        }
    }
});

export const { buyerOrdersPending, buyerOrdersSuccess, buyerOrdersFail } =
    buyerOrdersSlice.actions;

export default buyerOrdersSlice.reducer;
