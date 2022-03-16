import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { useEffect } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";
import { Carousel } from "react-responsive-carousel";
import {
    useHistory,
    useParams
} from "react-router-dom";

import ClassIcon from "@mui/icons-material/Class";
import SellerIcon from "@mui/icons-material/PersonPinCircle";
import {
    Button,
    ButtonGroup,
    Container,
    Grid,
    Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";

import NoImage from "../assets/noImage.png";
import {
    addToCart,
    decreaseQuantity
} from "../services/cartSlice";
import { getProduct } from "../services/productAction";
import { Loading } from "./";

const Wrapper = styled("div")(({ theme }) => ({
    padding: "50px",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
        padding: "0px 0px"
    }
}));
const TitleWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
}));

const Title = styled("h1")(({ theme }) => ({
    fontWeight: 200
}));

const Desc = styled("p")(({ theme }) => ({
    margin: "20px 0px"
}));

const Price = styled("span")(({ theme }) => ({
    fontWeight: 60,
    fontSize: 35
}));

const Location = styled("span")(({ theme }) => ({
    fontWeight: 20,
    fontSize: 18,
    padding: "20px 0"
}));

const Category = styled("span")(({ theme }) => ({
    fontWeight: 18,
    fontSize: 16
}));

const AddContainer = styled("h1")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
        display: "block",
        width: "100%"
    }
}));

const CartButton = styled(Button)(({ theme }) => ({
    padding: "10px"
}));

const ButtonWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between"
}));

const BuyNowButton = styled(Button)(({ theme }) => ({
    cursor: "pointer",
    margin: "5px",
    width: "100%",
    paddingTop: "10px",
    paddingBottom: "10px",
    [theme.breakpoints.up("md")]: {
        padding: "auto"
    },
    [theme.breakpoints.down("sm")]: {
        padding: "20px 40px"
    },
    [theme.breakpoints.down("xs")]: {
        padding: "none"
    }
}));

const Root = styled("div")`
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td,
    th {
        border: 1px solid #ddd;
        text-align: left;
        padding: 8px;
    }

    th {
        background-color: #ddd;
    }
`;

const ProductDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    const { product, isLoading, error } = useSelector(
        (state) => state.singleProduct
    );
    const cart = useSelector((state) => state.cart);

    const imageBaseUrl = "http://localhost:3001/product/image/";

    const currentCartItem = cart?.cartItems.find(
        (item) => item?.id === Number(id)
    );
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleDecrease = (product) => {
        dispatch(decreaseQuantity(product));
    };
    const handleIncrease = (product) => {
        dispatch(addToCart(product));
    };
    if (isLoading) return <Loading />;

    return (
        <Container>
            {error || !product.success ? (
                <div>Something went wrong!</div>
            ) : (
                <>
                    <Wrapper>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs sm={6}>
                                {product?.data?.ProductImages[0]?.image ? (
                                    <Carousel
                                        showArrows={true}
                                        showThumbs={true}
                                    >
                                        {product?.data?.ProductImages?.map(
                                            ({ image }, index) => {
                                                return (
                                                    <img
                                                        alt={index}
                                                        key={product?.data?.title}
                                                        src={`${imageBaseUrl}${image}`}
                                                        style={{objectFit: "cover"}}
                                                    />
                                                );
                                            }
                                        )}
                                    </Carousel>
                                ) : (
                                    <Carousel
                                        showArrows={true}
                                        showThumbs={true}
                                    >
                                        <img
                                            src={NoImage}
                                            alt={product?.data?.title}
                                        />
                                    </Carousel>
                                )}
                                <AddContainer
                                    sx={{ display: { xs: "none", sm: "flex" } }}
                                >
                                    <BuyNowButton
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() =>
                                            handleAddToCart(product.data)
                                        }
                                    >
                                        Add to Cart
                                    </BuyNowButton>
                                    <BuyNowButton
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            handleAddToCart(product.data);
                                            history.push("/cart");
                                        }}
                                    >
                                        Buy Now
                                    </BuyNowButton>
                                </AddContainer>
                            </Grid>
                            <Grid
                                item
                                sm={6}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "space-between"
                                }}
                            >
                                <TitleWrapper>
                                    <Title>{product?.data?.title}</Title>
                                    <span style={{ padding: "2px 5px" }}>
                                        <Price>€ {product?.data?.price}</Price>
                                    </span>
                                    <span style={{ padding: "2px 5px" }}>
                                        <ClassIcon fontSize="small" />
                                        <Category>
                                            {product?.data?.category}
                                        </Category>
                                    </span>
                                    <span style={{ padding: "2px 5px" }}>
                                        <SellerIcon fontSize="small" />
                                        <Location>
                                            {product?.data?.city}
                                            {", "}
                                            {product?.data?.postcode}
                                        </Location>
                                    </span>
                                </TitleWrapper>
                                <ButtonWrapper sx={{ marginTop: "1rem" }}>
                                    <ButtonGroup
                                        variant="outlined"
                                        aria-label="outlined button group"
                                        color="secondary"
                                        disableElevation
                                    >
                                        <CartButton
                                            onClick={() =>
                                                handleDecrease(product?.data)
                                            }
                                        >
                                            -
                                        </CartButton>
                                        <CartButton>
                                            {currentCartItem
                                                ? currentCartItem.cartQuantity
                                                : 0}
                                        </CartButton>
                                        <CartButton
                                            onClick={() =>
                                                handleIncrease(product?.data)
                                            }
                                        >
                                            +
                                        </CartButton>
                                    </ButtonGroup>
                                </ButtonWrapper>
                                <AddContainer
                                    sx={{
                                        display: { xs: "block", sm: "none" }
                                    }}
                                >
                                    <BuyNowButton
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() =>
                                            handleAddToCart(product.data)
                                        }
                                    >
                                        Add to Cart
                                    </BuyNowButton>
                                    <BuyNowButton
                                        onClick={() => {
                                            handleAddToCart(product.data);
                                            history.push("/cart");
                                        }}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Buy Now
                                    </BuyNowButton>
                                </AddContainer>
                                <Desc>{product?.data?.description}</Desc>
                            </Grid>
                        </Grid>
                    </Wrapper>
                    <Grid container justifyContent="center" spacing={1}>
                        <Grid item sm={12}>
                            <Typography
                                variant="h5"
                                sx={{ margin: "1rem 2rem" }}
                            >
                                More Details
                            </Typography>
                            <Root sx={{ maxWidth: "100%" }}>
                                <table aria-label="custom pagination table">
                                    <tbody>
                                        <tr>
                                            <td>Product Title</td>
                                            <td
                                                style={{ maxWidth: 250 }}
                                                align="right"
                                            >
                                                {product?.data?.title}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Product Category</td>
                                            <td
                                                style={{ maxWidth: 250 }}
                                                align="right"
                                            >
                                                {product?.data?.category}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Product Price</td>
                                            <td
                                                style={{ maxWidth: 250 }}
                                                align="right"
                                            >
                                                {product?.data?.price}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Orgin City</td>
                                            <td
                                                style={{ maxWidth: 250 }}
                                                align="right"
                                            >
                                                {product?.data?.city}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>City Postcode</td>
                                            <td
                                                style={{ maxWidth: 250 }}
                                                align="right"
                                            >
                                                {product?.data?.postcode}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Seller Name</td>
                                            <td
                                                style={{ maxWidth: 250 }}
                                                align="right"
                                            >
                                                {product?.data?.sellerName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Street</td>
                                            <td
                                                style={{ maxWidth: 250 }}
                                                align="right"
                                            >
                                                {product?.data?.street}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Contact Seller</td>
                                            <td
                                                style={{ maxWidth: 250 }}
                                                align="right"
                                            >
                                                {product?.data?.contact}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Root>
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default ProductDetail;
