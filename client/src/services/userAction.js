import { fetchUser } from "./userApi";
import { getUserPending, getUserFail, getUserSuccess } from "./userSlice";

export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch(getUserPending());
        const { data: userProfile } = await fetchUser();

        if (userProfile.data && userProfile.data.id)
            return dispatch(getUserSuccess(userProfile.data));

        dispatch(getUserFail("user is not found"));
    } catch (error) {
        dispatch(getUserFail(error.message));
    }
};
