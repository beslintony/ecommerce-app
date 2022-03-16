import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import OrderItem from "./OrderItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBuyerOrders } from "../../services/productAction";
import { Loading } from "..";

const Orders = () => {
    const dispatch = useDispatch();

    const { isLoading, orders } = useSelector(
        (state) => state.buyerOrders
    );
    const { user: currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        currentUser && dispatch(getBuyerOrders(currentUser.id));
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
                    <Typography color="text.primary">My Orders</Typography>
                </Breadcrumbs>
                <Typography variant="h5" sx={{ marginTop: "1rem" }}>
                    My Orders
                </Typography>
                <Grid container justifyContent="center" alignItems="center">
                    {isLoading && <Loading />}
                    <Grid item md={6}>
                        {orders?.data?.length ? (
                            orders?.data?.map((orderItem) => (
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

export default Orders;
