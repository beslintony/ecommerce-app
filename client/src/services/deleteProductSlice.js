import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isSuccess: false,
    error: ""
};

const deleteProductSlice = createSlice({
    name: "deleteProduct",
    initialState,
    reducers: {
        deleteProductPending: (state) => {
            state.isLoading = true;
        },
        deleteProductSuccess: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.error = "";
        },
        deleteProductFail: (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = payload;
        }
    }
});

export const { deleteProductPending, deleteProductSuccess, deleteProductFail } =
    deleteProductSlice.actions;

export default deleteProductSlice.reducer;
