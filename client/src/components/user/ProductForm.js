import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    Typography,
    InputAdornment,
    OutlinedInput,
    TextField,
    FormHelperText
} from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { DragNDrop, Loading } from "..";

const ProductForm = ({
    initialValues,
    validationSchema,
    onSubmitHandler,
    isLoading,
    files,
    setFiles
}) => {
    return (
        <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmitHandler}
                    validationSchema={validationSchema}
                >
                    {(props) => (
                        <Form>
                            {/* Form fields */}
                            <Grid container justify="space-between" spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="title"
                                        label="Add Title"
                                        name="title"
                                        autoFocus
                                        helperText={
                                            <ErrorMessage name="title" />
                                        }
                                        error={
                                            props.touched.title &&
                                            Boolean(props.errors.title)
                                        }
                                    />
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        multiline
                                        rows={8}
                                        rowsMax={45}
                                        fullWidth
                                        name="description"
                                        label="Add Description"
                                        id="description"
                                        helperText={
                                            <ErrorMessage name="description" />
                                        }
                                        error={
                                            props.touched.description &&
                                            Boolean(props.errors.description)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="street"
                                        label="Add Street Name"
                                        id="street"
                                        helperText={
                                            <ErrorMessage name="street" />
                                        }
                                        error={
                                            props.touched.street &&
                                            Boolean(props.errors.street)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="postcode"
                                        label="Add Post Code"
                                        id="postcode"
                                        error={
                                            props.touched.postcode &&
                                            Boolean(props.errors.postcode)
                                        }
                                    />
                                    <FormHelperText
                                        style={{ color: "#D32F2F" }}
                                    >
                                        <ErrorMessage name="postcode" />
                                    </FormHelperText>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="city"
                                        label="Add City"
                                        id="city"
                                        helperText={
                                            <ErrorMessage name="city" />
                                        }
                                        error={
                                            props.touched.city &&
                                            Boolean(props.errors.city)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="sellerName"
                                        label="Add Seller Name"
                                        id="sellerName"
                                        helperText={
                                            <ErrorMessage name="sellerName" />
                                        }
                                        error={
                                            props.touched.sellerName &&
                                            Boolean(props.errors.sellerName)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="contact"
                                        label="Add Contact"
                                        id="contact"
                                        helperText={
                                            <ErrorMessage name="contact" />
                                        }
                                        error={
                                            props.touched.contact &&
                                            Boolean(props.errors.contact)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        // select
                                        margin="normal"
                                        fullWidth
                                        name="category"
                                        label="Product Category"
                                        id="category"
                                        helperText={
                                            <ErrorMessage name="category" />
                                        }
                                        error={
                                            props.touched.category &&
                                            Boolean(props.errors.category)
                                        }
                                    ></Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl
                                        fullWidth
                                        // margin="normal"
                                        variant="outlined"
                                    >
                                        <InputLabel htmlFor="price">
                                            Price
                                        </InputLabel>
                                        <Field
                                            as={OutlinedInput}
                                            id="price"
                                            name="price"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    €
                                                </InputAdornment>
                                            }
                                            label="Price"
                                            error={
                                                props.touched.price &&
                                                Boolean(props.errors.price)
                                            }
                                        />
                                    </FormControl>
                                    <FormHelperText
                                        style={{ color: "#FF0000" }}
                                    >
                                        <ErrorMessage name="price" />
                                    </FormHelperText>
                                </Grid>

                                <Grid container>
                                    <br></br>
                                    {/* Image upload */}
                                    {files && setFiles && (
                                        <Box
                                            sx={{
                                                paddingLeft: "1rem",
                                                width: "100%"
                                            }}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="body"
                                            >
                                                IMAGES
                                            </Typography>
                                            <Grid
                                                container
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item xs={12}>
                                                    <DragNDrop
                                                        files={files}
                                                        setFiles={setFiles}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )}
                                </Grid>
                                <Grid container justifyContent="center">
                                    <Grid item xs={3}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            disabled={props.isSubmitting}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                {isLoading && <Loading />}
            </Grid>
        </Grid>
    );
};

export default ProductForm;
