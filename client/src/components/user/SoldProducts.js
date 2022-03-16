import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import OrderItem from "./OrderItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrders } from "../../services/productAction";
import { Loading } from "..";

const SoldProducts = () => {
    const dispatch = useDispatch();

    const { isLoading, soldProducts } = useSelector(
        (state) => state.sellerSoldProducts
    );
    const { user: currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        currentUser && dispatch(getSellerOrders(currentUser.id));
    }, [currentUser, dispatch]);

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
                    <Typography color="text.primary">Sold Products</Typography>
                </Breadcrumbs>
                <Typography variant="h5" sx={{ marginTop: "1rem" }}>
                    Sold Products
                </Typography>
                <Grid container justifyContent="center" alignItems="center">
                    {isLoading && <Loading />}
                    <Grid item md={6}>
                        {soldProducts?.data?.length ? (
                            soldProducts?.data?.map((orderItem) => (
                                <div key={orderItem?.productId}>
                                    <Link
                                        to={`/products/product/${orderItem?.productId}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit"
                                        }}
                                    >
                                        <OrderItem orderItem={orderItem} />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <span>Data not found or currently empty!</span>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default SoldProducts;
