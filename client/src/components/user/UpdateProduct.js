import { Container, Typography, Breadcrumbs, Alert } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../services/productsApi";
import { Loading, ProductForm } from "..";
import {
    updateProductFail,
    updateProductPending,
    updateProductSuccess
} from "../../services/updateProductSlice";
import { getProduct } from "../../services/productAction";

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    const {
        product,
        isLoading: productIsLoading,
        error: productError
    } = useSelector((state) => state.singleProduct);

    const { isLoading, error, isSuccess } = useSelector(
        (state) => state.updateProduct
    );
    const [msg, setMsg] = useState("");

    const initialValues = {
        title: product?.data?.title,
        description: product?.data?.description,
        street: product?.data?.street,
        postcode: product?.data?.postcode,
        city: product?.data?.city,
        price: product?.data?.price,
        category: product?.data?.category,
        sellerName: product?.data?.sellerName,
        contact: product?.data?.contact
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
        dispatch(updateProductPending());

        try {
            const product = await updateProduct(id, values);
            if (product.success === false) {
                return dispatch(updateProductFail(product.message));
            }
            dispatch(updateProductSuccess());
            setMsg(product.message);
            props.setSubmitting();
            props.resetForm();
        } catch (error) {
            dispatch(updateProductFail(error.message));
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
                    <Link
                        style={{
                            textDecoration: "none",
                            color: "inherit"
                        }}
                        to="/user/myproducts"
                    >
                        My Products
                    </Link>
                    <Typography color="text.primary">Update Product</Typography>
                </Breadcrumbs>
                <Typography variant="h5" sx={{ margin: "1rem 0" }}>
                    Update Product
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
                {productError && (
                    <Typography variant="h4" color="text.error">
                        Error fetching data
                    </Typography>
                )}
                {productIsLoading ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <ProductForm
                        isLoading={isLoading || productIsLoading}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmitHandler={onSubmitHandler}
                    />
                )}
            </Container>
        </>
    );
};

export default UpdateProduct;
