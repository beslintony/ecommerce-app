import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { loginSuccess } from "../services/loginSlice";

// custom router -- checks user validation
const AuthRoute = ({ comp: Component, ...rest }) => {
    const { isAuth } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    useEffect(() => {
        !isAuth &&
            localStorage.getItem("userToken") &&
            dispatch(loginSuccess());
    }, [dispatch, isAuth]);

    const Auth = isAuth | localStorage.getItem("userToken");

    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (Auth) return <Component {...props} />;
                    else if (!Auth)
                        return (
                            <Redirect
                                to={{
                                    pathname: "/signin", // redirect to sign in
                                    state: { next: props.location }
                                }}
                            />
                        );
                }}
            />
        </>
    );
};

export default AuthRoute;
