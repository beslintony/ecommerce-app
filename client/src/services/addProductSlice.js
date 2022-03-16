import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isSuccess: false,
    error: ""
};

const addProductSlice = createSlice({
    name: "addProduct",
    initialState,
    reducers: {
        addProductPending: (state) => {
            state.isLoading = true;
        },
        addProductSuccess: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.error = "";
        },
        addProductFail: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = payload;
        }
    }
});

export const { addProductPending, addProductSuccess, addProductFail } =
    addProductSlice.actions;

export default addProductSlice.reducer;
