import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isUpdated: false,
    error: ""
};

const userUpdateSlice = createSlice({
    name: "userUpdate",
    initialState,
    reducers: {
        userUpdatePending: (state) => {
            state.isLoading = true;
        },
        userUpdateSuccess: (state) => {
            state.isLoading = false;
            state.isUpdated = true;
            state.error = "";
        },
        userUpdateFail: (state, { payload }) => {
            state.isLoading = false;
            state.isUpdated = false;
            state.error = payload;
        }
    }
});

export const { userUpdatePending, userUpdateSuccess, userUpdateFail } =
    userUpdateSlice.actions;

export default userUpdateSlice.reducer;
