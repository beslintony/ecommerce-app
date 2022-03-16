import axios from "axios";
import {
    getSliderFail,
    getSliderPending,
    getSliderSuccess
} from "./sliderSlice";

const rootUrl = `http://localhost:3001/api/`;

export const getSlider = () => {
    return new Promise(async (resolve, reject) => {
        const url = `${rootUrl}/slider`;
        try {
            const res = await axios.get(url);
            resolve(res.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

export const getSliders = () => async (dispatch) => {
    try {
        dispatch(getSliderPending());
        const sliderData = await getSlider();

        if (sliderData && sliderData?.data?.length > 0)
            return dispatch(getSliderSuccess(sliderData));

        dispatch(getSliderFail("sliders is not found"));
    } catch (error) {
        dispatch(getSliderFail(error.message));
    }
};
