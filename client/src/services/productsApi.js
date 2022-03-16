import axios from "axios";

const rootUrl = `http://localhost:3001/api/`;
const productUrl = `${rootUrl}product`;
const productsUrl = `${rootUrl}products`;
const buyProductsUrl = `${rootUrl}orders`;
const buyerBoughtProductsUrl = `${rootUrl}analysis/buyer`;
const sellerSoldProductsUrl = `${rootUrl}analysis/seller`;

export const addProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userToken = JSON.parse(localStorage.getItem("userToken"));
            if (!userToken) {
                reject("Token not Found");
            }
            const res = await axios.post(productUrl, data, {
                headers: {
                    Authorization: "Bearer Bearer " + userToken
                }
            });
            resolve(res.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

export const updateProduct = (productId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userToken = JSON.parse(localStorage.getItem("userToken"));
            if (!userToken) {
                reject("Token not Found");
            }
            const res = await axios.patch(`${productUrl}/${productId}`, data, {
                headers: {
                    Authorization: "Bearer Bearer " + userToken
                }
            });
            resolve(res.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

export const deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userToken = JSON.parse(localStorage.getItem("userToken"));
            if (!userToken) {
                reject("Token not Found");
            }
            const res = await axios.delete(`${productUrl}/${productId}`, {
                headers: {
                    Authorization: "Bearer Bearer " + userToken
                }
            });
            resolve(res.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

export const getAllProducts = (queryUrl) => {
    return new Promise(async (resolve, reject) => {
        const url = `${productsUrl}?${queryUrl}`;
        try {
            const res = await axios.get(url);
            resolve(res.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

export const getSingleProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`${productUrl}/${productId}`);
            resolve(res.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

export const buyProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userToken = JSON.parse(localStorage.getItem("userToken"));
            if (!userToken) {
                reject("Token not Found");
            }
            const res = await axios.post(buyProductsUrl, data, {
                headers: {
                    Authorization: "Bearer Bearer " + userToken
                }
            });
            resolve(res.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

export const buyerBoughtProducts = (buyerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userToken = JSON.parse(localStorage.getItem("userToken"));
            if (!userToken) {
                reject("Token not Found");
            }
            const res = await axios.get(
                `${buyerBoughtProductsUrl}/${buyerId}`,
                {
                    headers: {
                        Authorization: "Bearer TOKEN " + userToken
                    }
                }
            );
            resolve(res.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
export const sellerSoldProducts = (sellerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userToken = JSON.parse(localStorage.getItem("userToken"));
            if (!userToken) {
                reject("Token not Found");
            }
            const res = await axios.get(
                `${sellerSoldProductsUrl}/${sellerId}`,
                {
                    headers: {
                        Authorization: "Bearer TOKEN " + userToken
                    }
                }
            );
            resolve(res.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
