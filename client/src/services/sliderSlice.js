import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sliders: {},
    isLoading: false,
    error: ""
};

const sliderSlice = createSlice({
    name: "sliders",
    initialState,
    reducers: {
        getSliderPending: (state) => {
            state.isLoading = true;
        },
        getSliderSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.sliders = payload;
            state.error = "";
        },
        getSliderFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }
});

export const { getSliderPending, getSliderFail, getSliderSuccess } =
    sliderSlice.actions;

export default sliderSlice.reducer;
