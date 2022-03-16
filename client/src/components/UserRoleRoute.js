import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { loginSuccess } from "../services/loginSlice";

// custom router -- checks user validation
const UserRoleRoute = ({ comp: Component, ...rest }) => {
    const { isAuth } = useSelector((state) => state.login);
    const {
        user: { roles }
    } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        !isAuth &&
            localStorage.getItem("userToken") &&
            dispatch(loginSuccess());
    }, [dispatch, isAuth]);

    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (roles?.findIndex((el) => el === rest.role) >= 0)
                        return <Component {...props} />;
                    else
                        return (
                            <Redirect
                                to={{
                                    pathname: "/user/dashboard",
                                    state: { next: props.location }
                                }}
                            />
                        );
                }}
            />
        </>
    );
};

export default UserRoleRoute;
