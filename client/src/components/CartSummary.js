import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    Link,
    useHistory
} from "react-router-dom";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
    buyProductsFail,
    buyProductsPending,
    buyProductsSuccess
} from "../services/buyProductsSlice";
import { clearCart } from "../services/cartSlice";
import { loginFail } from "../services/loginSlice";
import { buyProducts } from "../services/productsApi";
import { getUserProfile } from "../services/userAction";
import { getUserSuccess } from "../services/userSlice";

const CartSummary = ({ cart,setMsg }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state) => state.user);
    const { isAuth } = useSelector((state) => state.login);

    const Wrapper = styled("div")(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        marginTop: "2rem"
    }));
    const Subtotal = styled("div")(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        fontSize: "20px",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(5),
            width: "auto"
        }
    }));
    const Amount = styled("span")(({ theme }) => ({
        fontWeight: "700"
    }));

    const Content = styled("p")(({ theme }) => ({
        fontSize: "14px",
        fontWeight: "200",
        margin: "0.5rem 0"
    }));

    const checkOutHandler = async () => {
        dispatch(getUserProfile());
        let products = [];

        cart?.cartItems?.map((el) => {
            const product = {
                productId: el.id,
                seller_id: el.seller_id,
                quantity: el.cartQuantity,
                oneUnitPrice: parseFloat(el.price),
                totalPrice: parseInt(el.cartQuantity) * parseFloat(el.price)
            };
            products.push(product);
        });

        const orders = {
            buyerId: user?.id,
            totalPrice: parseFloat(cart.cartTotalAmount),
            products: products
        };
        const buyerRole = user?.roles?.findIndex((el) => el === "buyer");

        user && buyerRole >= 0 && (await saveOrderDetails(orders));

        user &&
            buyerRole === -1 &&
            dispatch(
                buyProductsFail(
                    "You do not have the authorization to make an order"
                )
            ) &&
            dispatch(clearCart());

        if (!isAuth || !localStorage.getItem("userToken")) {
            dispatch(getUserSuccess({ user: {} }));
            dispatch(loginFail("please login to continue"));
            history.push("/signin");
        }
    };

    const saveOrderDetails = async (orders) => {
        dispatch(buyProductsPending());
        try {
            const product = await buyProducts(orders);
            if (product.success === false) {
                return dispatch(buyProductsFail(product.message));
            }
            dispatch(buyProductsSuccess());
            setMsg("You have placed your orders successfully!");
            dispatch(clearCart());
        } catch (error) {
            dispatch(buyProductsFail(error.message));
            setMsg(error.message);
        }
    };

    return (
        <>
            <Wrapper>
                <Subtotal>
                    <span>Subtotal</span>
                    <Amount>€ {cart.cartTotalAmount}</Amount>
                    <Content>Inclusive all Taxes</Content>
                    <Button
                        onClick={checkOutHandler}
                        variant="contained"
                        color="secondary"
                    >
                        check out
                    </Button>
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
                </Subtotal>
            </Wrapper>
        </>
    );
};

export default CartSummary;
