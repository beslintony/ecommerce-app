import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isSuccess: false,
    error: ""
};

const updateProductSlice = createSlice({
    name: "updateProduct",
    initialState,
    reducers: {
        updateProductPending: (state) => {
            state.isLoading = true;
        },
        updateProductSuccess: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.error = "";
        },
        updateProductFail: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = payload;
        }
    }
});

export const { updateProductPending, updateProductSuccess, updateProductFail } =
    updateProductSlice.actions;

export default updateProductSlice.reducer;
