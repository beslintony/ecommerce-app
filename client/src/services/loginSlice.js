import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isAuth: false,
    error: ""
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginPending: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state) => {
            state.isLoading = false;
            state.isAuth = true;
            state.error = "";
        },
        loginFail: (state, { payload }) => {
            state.isLoading = false;
            state.isAuth = false;
            state.error = payload
        }
    }
});


export const {
   loginPending,
   loginSuccess,
   loginFail
} = loginSlice.actions;

export default loginSlice.reducer;