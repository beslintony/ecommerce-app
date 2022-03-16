import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./services/cartSlice";
import loginReducer from "./services/loginSlice";
import userReducer from "./services/userSlice";
import registrationReducer from "./services/registrationSlice";
import userUpdateReducer from "./services/userUpdateSlice";
import addProductReducer from "./services/addProductSlice";
import updateProductReducer from "./services/updateProductSlice";
import deleteProductReducer from "./services/deleteProductSlice";
import allProductsReducer from "./services/allProductsSlice";
import singleProductReducer from "./services/singleProductSlice";
import buyProductsReducer from "./services/buyProductsSlice";
import buyerOrdersReducer from "./services/buyerOdersSlice";
import sellerSoldProductsReducer from "./services/sellerSoldProductsSlice";
import updateProfileImageReducer from "./services/updateProfileImageSlice";
import sliderReducer from "./services/sliderSlice";
import myProductsReducer from "./services/myProductsSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        login: loginReducer,
        user: userReducer,
        registration: registrationReducer,
        userUpdate: userUpdateReducer,
        addProduct: addProductReducer,
        updateProduct: updateProductReducer,
        deleteProduct: deleteProductReducer,
        allProducts: allProductsReducer,
        singleProduct: singleProductReducer,
        buyProducts: buyProductsReducer,
        buyerOrders: buyerOrdersReducer,
        sellerSoldProducts: sellerSoldProductsReducer,
        updateProfileImage: updateProfileImageReducer,
        myProducts: myProductsReducer,
        slider: sliderReducer
    }
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(productsApi.middleware)
});
