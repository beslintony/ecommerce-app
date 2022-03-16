import {
    getAllProductsFail,
    getAllProductsPending,
    getAllProductsSuccess
} from "./allProductsSlice";
import {
    buyerBoughtProducts,
    getAllProducts,
    getSingleProduct,
    sellerSoldProducts
} from "./productsApi";
import {
    getSingleProductFail,
    getSingleProductPending,
    getSingleProductSuccess
} from "./singleProductSlice";
import {
    buyerOrdersPending,
    buyerOrdersSuccess,
    buyerOrdersFail
} from "./buyerOdersSlice.js";
import {
    sellerSoldProductsFail,
    sellerSoldProductsPending,
    sellerSoldProductsSuccess
} from "./sellerSoldProductsSlice";

export const getProducts = (queryUrl) => async (dispatch) => {
    try {
        dispatch(getAllProductsPending());
        const productData = await getAllProducts(queryUrl);

        if (productData && productData.records > 0)
            return dispatch(getAllProductsSuccess(productData));

        dispatch(getAllProductsFail("products is not found"));
    } catch (error) {
        dispatch(getAllProductsFail(error.message));
    }
};
export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch(getSingleProductPending());
        const productData = await getSingleProduct(id);

        if (productData) return dispatch(getSingleProductSuccess(productData));

        dispatch(getSingleProductFail("product is not found"));
    } catch (error) {
        dispatch(getSingleProductFail(error.message));
    }
};

export const getBuyerOrders = (id) => async (dispatch) => {
    try {
        dispatch(buyerOrdersPending());
        const orderData = await buyerBoughtProducts(id);

        if (orderData) return dispatch(buyerOrdersSuccess(orderData));

        dispatch(buyerOrdersFail("product is not found"));
    } catch (error) {
        dispatch(buyerOrdersFail(error.message));
    }
};
export const getSellerOrders = (id) => async (dispatch) => {
    try {
        dispatch(sellerSoldProductsPending());
        const orderData = await sellerSoldProducts(id);

        if (orderData) return dispatch(sellerSoldProductsSuccess(orderData));

        dispatch(sellerSoldProductsFail("product is not found"));
    } catch (error) {
        dispatch(sellerSoldProductsFail(error.message));
    }
};
