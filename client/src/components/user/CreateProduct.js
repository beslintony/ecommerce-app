import { Container, Typography, Breadcrumbs, Alert } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addProductFail,
    addProductPending,
    addProductSuccess
} from "../../services/addProductSlice";
import { addProduct } from "../../services/productsApi";
import { ProductForm } from "..";
const CreateProduct = () => {
    const dispatch = useDispatch();
    const { isLoading, error, isSuccess } = useSelector(
        (state) => state.addProduct
    );
    const [msg, setMsg] = useState("");
    const [files, setFiles] = useState([]);

    const initialValues = {
        title: "",
        description: "",
        street: "",
        postcode: "",
        city: "",
        price: "",
        category: "",
        sellerName: "",
        contact: ""
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("required").max(500),
        description: Yup.string().required("required"),
        street: Yup.string().required("required").max(50),
        sellerName: Yup.string().required("required"),
        postcode: Yup.string()
            .required()
            .matches(/^[0-9]+$/, "must contain only digits")
            .min(5, "must be exactly 5 digits")
            .max(5, "must be exactly 5 digits"),
        city: Yup.string().required("required"),
        price: Yup.number()
            .required("required")
            .test("is-decimal", "invalid price", (value) =>
                (value + "").match(/^\d*\.{1}\d*$/)
            ),
        contact: Yup.string()
            .required()
            .matches(/^[0-9]+$/, "must be a number")
            .max(11, "maximum 11 digits including 0 at first"),
        category: Yup.string("please select a category").required("required")
    });
    const onSubmitHandler = async (values, props) => {
        dispatch(addProductPending());

        const data = new FormData();
        data.append("title", values.title);
        data.append("description", values.description);
        data.append("price", values.price);
        data.append("street", values.street);
        data.append("sellerName", values.sellerName);
        data.append("postcode", values.postcode);
        data.append("city", values.city);
        data.append("contact", values.contact);
        data.append("category", values.category);
        for (let i = 0; i < files.length; i++) {
            data.append("file", files[i]);
        }

        try {
            const product = await addProduct(data);
            if (product.success === false) {
                return dispatch(addProductFail(product.message));
            }
            dispatch(addProductSuccess());
            setMsg(product.message);
            props.setSubmitting();
            props.resetForm();
            setFiles(null)
        } catch (error) {
            dispatch(addProductFail(error.message));
        }
    };

    return (
        <>
            <Container>
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: "1rem" }}>
                    <Link
                        style={{
                            textDecoration: "none",
                            color: "inherit"
                        }}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                    <Typography color="text.primary">Add Product</Typography>
                </Breadcrumbs>
                <Typography variant="h5" sx={{ marginTop: "1rem" }}>
                    Add Product
                </Typography>
                {!isLoading && error && (
                    <Box
                        sx={{
                            margin: 2
                        }}
                    >
                        <Alert variant="filled" severity="error">
                            {error}
                        </Alert>
                    </Box>
                )}
                {isSuccess && msg && (
                    <Box
                        sx={{
                            margin: 2
                        }}
                    >
                        <Alert variant="filled" severity="success">
                            {msg}
                        </Alert>
                    </Box>
                )}
                <ProductForm
                    isLoading={isLoading}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmitHandler={onSubmitHandler}
                    files={files}
                    setFiles={setFiles}
                />
            </Container>
        </>
    );
};

export default CreateProduct;
