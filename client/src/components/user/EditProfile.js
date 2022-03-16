import {
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Container,
    MenuItem,
    Alert
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components";
import {
    userUpdateFail,
    userUpdatePending,
    userUpdateSuccess
} from "../../services/userUpdateSlice";
import { updateUser } from "../../services/userApi";
import { getUserProfile } from "../../services/userAction";

const theme = createTheme();

const EditProfile = () => {
    const dispatch = useDispatch();
    const { isLoading, error, isUpdated } = useSelector(
        (state) => state.userUpdate
    );

    const { user: currentUser } = useSelector((state) => state.user);

    const [successMsg, setSuccessMsg] = useState("");

    const initialValues = {
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        birthday: currentUser?.dateOfBirth,
        gender: currentUser?.gender
    };

    let validationSchema = Yup.object({
        firstName: Yup.string().required("required"),
        lastName: Yup.string().required("required"),
        birthday: Yup.date()
            .required("required")
            .test("DOB", "you must be 14 years or older", (value) => {
                return moment().diff(moment(value), "years") >= 14;
            }),
        gender: Yup.number().required("required")
    });

    const onSubmitHandler = async (values, props) => {
        dispatch(userUpdatePending());

        const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth: values.birthday,
            gender: values.gender
        };

        try {
            const updatedUser = await updateUser(user);
            if (updatedUser.success === false) {
                return dispatch(userUpdateFail(updatedUser.message));
            }
            dispatch(userUpdateSuccess());
            dispatch(getUserProfile());
            props.setSubmitting();
            setSuccessMsg(updatedUser.message);
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
                            Update Profile
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
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="firstName"
                                        label="First Name *"
                                        name="firstName"
                                        autoComplete="firstName"
                                        helperText={
                                            <ErrorMessage name="firstName" />
                                        }
                                        error={
                                            props.touched.firstName &&
                                            Boolean(props.errors.firstName)
                                        }
                                    />
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="lastName"
                                        label="Last Name *"
                                        name="lastName"
                                        autoComplete="lastName"
                                        helperText={
                                            <ErrorMessage name="lastName" />
                                        }
                                        error={
                                            props.touched.lastName &&
                                            Boolean(props.errors.lastName)
                                        }
                                    />

                                    <Field
                                        as={TextField}
                                        margin="normal"
                                        fullWidth
                                        select
                                        id="gender"
                                        label="Gender *"
                                        name="gender"
                                        helperText={
                                            <ErrorMessage name="gender" />
                                        }
                                        error={
                                            props.touched.gender &&
                                            Boolean(props.errors.gender)
                                        }
                                    >
                                        <MenuItem value={1}>Male</MenuItem>
                                        <MenuItem value={2}>Female</MenuItem>
                                        <MenuItem value={3}>Other</MenuItem>
                                    </Field>
                                    <Field
                                        as={TextField}
                                        margin="normal"
                                        fullWidth
                                        id="date"
                                        name="birthday"
                                        label="Date of Birth *"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        helperText={
                                            <ErrorMessage name="birthday" />
                                        }
                                        error={
                                            props.touched.birthday &&
                                            Boolean(props.errors.birthday)
                                        }
                                    />

                                    <Button
                                        type="submit"
                                        disabled={props.isSubmitting}
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Update
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

export default EditProfile;
