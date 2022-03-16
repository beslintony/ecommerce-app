import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isUpdated: false,
    error: ""
};

const updateProfileImageSlice = createSlice({
    name: "updateProfileImage",
    initialState,
    reducers: {
        updateProfileImagePending: (state) => {
            state.isLoading = true;
        },
        updateProfileImageSuccess: (state) => {
            state.isLoading = false;
            state.isUpdated = true;
            state.error = "";
        },
        updateProfileImageFail: (state, { payload }) => {
            state.isLoading = false;
            state.isUpdated = false;
            state.error = payload;
        }
    }
});

export const { updateProfileImagePending, updateProfileImageSuccess, updateProfileImageFail } =
updateProfileImageSlice.actions;

export default updateProfileImageSlice.reducer;
