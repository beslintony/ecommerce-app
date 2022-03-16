import {
    Avatar,
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    Alert
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginPending, loginSuccess, loginFail } from "../services/loginSlice";

import { userLogin } from "../services/userApi";

import { getUserProfile } from "../services/userAction";
import { useEffect } from "react";
import { Loading } from "../components";

const theme = createTheme();

const SignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { isLoading, error, isAuth } = useSelector((state) => state.login);

    useEffect(() => {
        (isAuth || localStorage.getItem("userToken")) &&
            history.push(location?.state?.next?.pathname || "/user/dashboard");
    }, [isAuth, history, location?.state?.next?.pathname]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(loginPending());
        const data = new FormData(event.currentTarget);
        const user = {
            email: data.get("email"),
            password: data.get("password")
        };
        try {
            const isAuth = await userLogin(user);
            if (isAuth.success === false) {
                return dispatch(loginFail(isAuth.message));
            }
            dispatch(loginSuccess());
            dispatch(getUserProfile());
            history.push("/user/dashboard");
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {error && (
                        <Box
                            sx={{
                                marginTop: 2
                            }}
                        >
                            <Alert variant="filled" severity="error">
                                {error}
                            </Alert>
                        </Box>
                    )}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link
                                    to="/signup"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Typography variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    {isLoading && <Loading />}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignIn;
