import {
    Avatar,
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    MenuItem,
    Alert,
    FormHelperText,
    FormControlLabel,
    Checkbox
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CustomizedDialogs, Loading } from "../components";
import {
    registrationPending,
    registrationSuccess,
    registrationFail
} from "../services/registrationSlice";
import { registerUser } from "../services/userApi";
const theme = createTheme();

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoading, error, isRegistered } = useSelector(
        (state) => state.registration
    );

    const [open, setOpen] = useState(false);

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
        birthday: "",
        gender: 1,
        seller: false,
        buyer: false
    };

    let validationSchema = Yup.object({
        firstName: Yup.string().required("required"),
        lastName: Yup.string().required("required"),
        email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("required"),
        password: Yup.string()
            .min(8, "minimum 8 characters required")
            .required("required"),
        repassword: Yup.string()
            .oneOf([Yup.ref("password")], "passwords doesn't match")
            .required("required"),
        birthday: Yup.date()
            .required("required")
            .test("DOB", "you must be 14 years or older", (value) => {
                return moment().diff(moment(value), "years") >= 14;
            }),
        gender: Yup.number().required("required"),
        seller: Yup.boolean(),
        buyer: Yup.boolean()
    });

    validationSchema = validationSchema.test(
        "myCustomCheckboxTest",
        null,
        (obj) => {
            if (obj.buyer || obj.seller) {
                return true;
            }

            return new Yup.ValidationError(
                "❗ Check at least one checkbox",
                null,
                "myCustomFieldName"
            );
        }
    );

    const onSubmitHandler = async (values, props) => {
        dispatch(registrationPending());

        const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            dateOfBirth: values.birthday,
            gender: values.gender,
            isAdmin: false,
            isBuyer: values.buyer,
            isSeller: values.seller
        };

        try {
            const registeredUser = await registerUser(user);
            if (registeredUser.success === false) {
                return dispatch(registrationFail(registeredUser.message));
            }
            dispatch(registrationSuccess());
            setOpen(true);
            setTimeout(() => {
                history.push("/signin");
            }, 5000);
            props.setSubmitting();
            props.resetForm();
        } catch (error) {
            dispatch(registrationFail(error.message));
        }
    };

    return (
        <>
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
                        {isLoading && <Loading />}
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
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
                                        id="email"
                                        label="Email Address *"
                                        name="email"
                                        autoComplete="email"
                                        helperText={
                                            <ErrorMessage name="email" />
                                        }
                                        error={
                                            props.touched.email &&
                                            Boolean(props.errors.email)
                                        }
                                    />
                                    <Typography color="primary" variant="body2">
                                        User Role *
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Field
                                                as={Checkbox}
                                                name="buyer"
                                                color="primary"
                                            />
                                        }
                                        label="Buyer"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Field
                                                as={Checkbox}
                                                name="seller"
                                                color="primary"
                                            />
                                        }
                                        label="Seller"
                                    />
                                    <FormHelperText
                                        style={{ color: "#D32F6B" }}
                                    >
                                        {props.values.seller === false &&
                                            props.values.buyer === false &&
                                            "please select at least one"}
                                    </FormHelperText>
                                    <FormHelperText
                                        style={{ color: "#D32F6B" }}
                                    >
                                        <ErrorMessage name="seller" />
                                    </FormHelperText>
                                    <FormHelperText
                                        style={{ color: "#D32F6B" }}
                                    >
                                        <ErrorMessage name="buyer" />
                                    </FormHelperText>
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
                                        Sign Up
                                    </Button>
                                    {isRegistered && (
                                        <CustomizedDialogs
                                            open={open}
                                            setOpen={setOpen}
                                            title="Sign Up Successful!"
                                        >
                                            You have successfully signed up. You
                                            will be shortly redirected to the
                                            login page. Otherwise,{" "}
                                            <Link to="/signin">click here</Link>{" "}
                                            to speed up the process.
                                        </CustomizedDialogs>
                                    )}
                                    <Grid container>
                                        <Grid item>
                                            <Link
                                                to="/signin"
                                                style={{
                                                    textDecoration: "none"
                                                }}
                                            >
                                                <Typography variant="body2">
                                                    Already have an account?
                                                    Login
                                                </Typography>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default SignUp;
