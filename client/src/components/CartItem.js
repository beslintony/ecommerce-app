import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import {
    Button,
    ButtonGroup
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
    addToCart,
    decreaseQuantity,
    removeFromCart
} from "../services/cartSlice";

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };
    const handleDecrease = (cartItem) => {
        dispatch(decreaseQuantity(cartItem));
    };
    const handleIncrease = (cartItem) => {
        dispatch(addToCart(cartItem));
    };

    const Wrapper = styled("div")(({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid violet",
        paddingBottom: "20px"
    }));

    const ContentWrapper = styled("div")(({ theme }) => ({
        display: "flex",
        justifyContent: "space-between"
    }));

    const ButtonWrapper = styled("div")(({ theme }) => ({
        display: "flex",
        justifyContent: "space-between"
    }));

    const ImgWrapper = styled("div")(({ theme }) => ({
        padding: "1rem",
        maxWidth: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }));

    const Img = styled("img")(({ theme }) => ({
        maxWidth: "100%",
        objectFit: "fill",
        marginLeft: "40px"
    }));

    const CartButton = styled(Button)(({ theme }) => ({
        padding: "3px"
    }));

    const imageBaseUrl = "http://localhost:3001/product/image/";

    return (
        <>
            <Wrapper>
                <div style={{ flex: 1 }}>
                    <Link
                        to={`products/product/${cartItem.id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        <h3>{cartItem.title}</h3>
                    </Link>
                    <ContentWrapper>
                        <p>Price: € {cartItem.price}</p>
                        <p>
                            Total: €{" "}
                            {(cartItem.cartQuantity * cartItem.price).toFixed(
                                2
                            )}
                        </p>
                    </ContentWrapper>
                    <ButtonWrapper>
                        <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                            color="secondary"
                            disableElevation
                        >
                            <CartButton
                                onClick={() => handleDecrease(cartItem)}
                            >
                                -
                            </CartButton>
                            <CartButton>{cartItem.cartQuantity}</CartButton>
                            <CartButton
                                onClick={() => handleIncrease(cartItem)}
                            >
                                +
                            </CartButton>
                        </ButtonGroup>
                        <CartButton
                            color="secondary"
                            onClick={() => handleRemoveFromCart(cartItem)}
                        >
                            <DeleteIcon />
                        </CartButton>
                    </ButtonWrapper>
                </div>
                <ImgWrapper>
                    <Link
                        to={`products/product/${cartItem.id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        <Img src={`${imageBaseUrl}${cartItem?.ProductImages[0]?.image}`} alt={cartItem.title} />
                    </Link>
                </ImgWrapper>
            </Wrapper>
        </>
    );
};

export default CartItem;
