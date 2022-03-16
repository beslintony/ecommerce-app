import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isRegistered: false,
    error: ""
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        registrationPending: (state) => {
            state.isLoading = true;
        },
        registrationSuccess: (state) => {
            state.isLoading = false;
            state.isRegistered = true;
            state.error = "";
        },
        registrationFail: (state, { payload }) => {
            state.isLoading = false;
            state.isRegistered = false;
            state.error = payload;
        }
    }
});

export const { registrationPending, registrationSuccess, registrationFail } =
    registrationSlice.actions;

export default registrationSlice.reducer;
