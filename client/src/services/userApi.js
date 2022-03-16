import axios from "axios";

const rootUrl = "http://localhost:3001/api/";
const loginUrl = `${rootUrl}login`;
const userProfileUrl = `${rootUrl}user_profile`;
const registrationUrl = `${rootUrl}users`;
const userUpdateUrl = `${rootUrl}user-update/`;
const profileImageUrl = `${rootUrl}postProfileImage/`;

export const userLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(loginUrl, data);
            resolve(res.data);
            if (res.data.success === true) {
                localStorage.setItem(
                    "userToken",
                    JSON.stringify(res.data.data.token)
                );
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
export const fetchUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const userToken = JSON.parse(localStorage.getItem("userToken"));
            if (!userToken) {
                reject("Token not Found");
            }
            const res = await axios.get(userProfileUrl, {
                headers: {
                    Authorization: "Bearer Bearer " +userToken
                }
            });
            resolve(res);
        } catch (error) {
            console.error(error);
            reject(error.message);
        }
    });
};
export const registerUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(registrationUrl, data);
            resolve(res.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
export const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userToken = JSON.parse(localStorage.getItem("userToken"));
            if (!userToken) {
                reject("Token not Found");
            }
            const res = await axios.patch(userUpdateUrl, data, {
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
export const updateProfileImage = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userToken = JSON.parse(localStorage.getItem("userToken"));
            if (!userToken) {
                reject("Token not Found");
            }
            const res = await axios.post(profileImageUrl, data, {
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
