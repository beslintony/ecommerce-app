import React, {
    useEffect,
    useState
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    Link,
    useLocation
} from "react-router-dom";

import {
    Button,
    Container,
    Grid
} from "@mui/material";

import { clearCart } from "../services/cartSlice";
import { CartItem } from "./";
import CartSummary from "./CartSummary";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const { isSuccess, error } = useSelector((state) => state.buyProducts);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [msg, setMsg] = useState("");

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    useEffect(() => {
        pathname && setMsg("");
    }, [pathname]);

    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {!error && msg && <h2>Shopping Success</h2>}
                {error && msg && <h2>Order Error</h2>}
                {!msg && <h2>Your Shopping Cart</h2>}
                {cart.cartItems.length === 0 ? (
                    <>
                        {msg ? <p> {msg} </p> : <p> Empty Cart </p>}
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                marginTop: "1rem"
                            }}
                        >
                            <Button
                                sx={{
                                    backgroundColor: "transparent",
                                    cursor: "pointer",
                                    color: "#000000",
                                    border: "1px solid #000000",
                                    fontWeight: 600
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Link>
                    </>
                ) : (
                    <Container>
                        <Grid container>
                            <Grid item md={8}>
                                {cart.cartItems?.map((cartItem) => (
                                    <div key={cartItem.id}>
                                        <CartItem cartItem={cartItem} />
                                    </div>
                                ))}
                                <Button
                                    variant="outlined"
                                    color="error"
                                    sx={{
                                        marginTop: "2rem",
                                        backgroundColor: "transparent",
                                        cursor: "pointer",
                                        color: "grey",
                                        border: "1px solid red",
                                        fontWeight: 600
                                    }}
                                    onClick={() => handleClearCart()}
                                >
                                    clear cart
                                </Button>
                            </Grid>

                            <Grid item md={4}>
                                <Container>
                                    <CartSummary cart={cart} setMsg={setMsg} />
                                </Container>
                            </Grid>
                        </Grid>
                    </Container>
                )}
            </div>
        </Container>
    );
};

export default Cart;
