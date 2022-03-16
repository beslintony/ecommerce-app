import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: {
        productName: "",
        minPrice: "",
        maxPrice: ""
    },
    products: {},
    isLoading: false,
    error: ""
};

const allProductsSlice = createSlice({
    name: "allProducts",
    initialState,
    reducers: {
        getAllProductsPending: (state) => {
            state.isLoading = true;
        },
        getAllProductsSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.products = payload;
            state.error = "";
        },
        getAllProductsFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        initializeSearch: (state) => {
            state.isLoading = false;
            state.error = "";
            state.search = {
                productName: "",
                minPrice: "",
                maxPrice: ""
            };
        },
        setProductName: (state, { payload }) => {
            state.search.productName = payload;
        },
        setMinPrice: (state, { payload }) => {
            state.search.minPrice = payload;
        },
        setMaxPrice: (state, { payload }) => {
            state.search.maxPrice = payload;
        }
    }
});

export const {
    getAllProductsPending,
    getAllProductsFail,
    getAllProductsSuccess,
    initializeSearch,
    setProductName,
    setMinPrice,
    setMaxPrice
} = allProductsSlice.actions;

export default allProductsSlice.reducer;
