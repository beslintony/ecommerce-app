import {
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Alert
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components";
import {
    userUpdateFail,
    userUpdatePending,
    userUpdateSuccess
} from "../../services/userUpdateSlice";
import { updateUser } from "../../services/userApi";
import { getUserProfile } from "../../services/userAction";
import { getUserSuccess } from "../../services/userSlice";
import { loginFail } from "../../services/loginSlice";

const theme = createTheme();

const UpdatePassword = () => {
    const dispatch = useDispatch();

    const { isLoading, error, isUpdated } = useSelector(
        (state) => state.userUpdate
    );
    const [successMsg, setSuccessMsg] = useState("");

    const initialValues = {
        password: "",
        repassword: ""
    };

    let validationSchema = Yup.object({
        password: Yup.string()
            .min(8, "minimum 8 characters required")
            .required("required"),
        repassword: Yup.string()
            .oneOf([Yup.ref("password")], "passwords doesn't match")
            .required("required")
    });

    const onSubmitHandler = async (values, props) => {
        dispatch(userUpdatePending());

        const user = {
            password: values.password
        };

        try {
            const updatedUser = await updateUser(user);
            if (updatedUser.success === false) {
                return dispatch(userUpdateFail(updatedUser.message));
            }
            dispatch(userUpdateSuccess());
            dispatch(getUserProfile());
            props.setSubmitting();
            props.resetForm();
            setSuccessMsg(updatedUser.message);
            localStorage.removeItem("userToken");
            dispatch(getUserSuccess({ user: {} }));
            dispatch(loginFail(""));
        } catch (error) {
            dispatch(userUpdateFail(error.message));
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        {isLoading && <Loading />}
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Update Password
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
                        {isUpdated && successMsg && (
                            <Box
                                sx={{
                                    marginTop: 2
                                }}
                            >
                                <Alert variant="filled" severity="success">
                                    {successMsg}
                                </Alert>
                            </Box>
                        )}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmitHandler}
                        >
                            {(props) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Password *"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        helperText={
                                            <ErrorMessage name="password" />
                                        }
                                        error={
                                            props.touched.password &&
                                            Boolean(props.errors.password)
                                        }
                                    />
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        name="repassword"
                                        label="Confirm Password *"
                                        type="password"
                                        id="repassword"
                                        autoComplete="new-password"
                                        helperText={
                                            <ErrorMessage name="repassword" />
                                        }
                                        error={
                                            props.touched.repassword &&
                                            Boolean(props.errors.repassword)
                                        }
                                    />
                                    <Button
                                        type="submit"
                                        disabled={props.isSubmitting}
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        update password
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default UpdatePassword;
