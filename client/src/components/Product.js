import { useDispatch } from "react-redux";
import {
    Link,
    useRouteMatch
} from "react-router-dom";

import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography
} from "@mui/material";

import NoImage from "../assets/noImage.png";
import { addToCart } from "../services/cartSlice";
import { Loading } from "./";

const Product = ({ product, isLoading }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const { url } = useRouteMatch();

    if (isLoading) return <Loading />;

    const imageBaseUrl = "http://localhost:3001/product/image/";

    return (
        <>
            <Card sx={{ minWidth: "auto", width: 240, maxWidth: 300 }}>
                <Link
                    to={
                        url === "/products/"
                            ? `product/${product.id}`
                            : `products/product/${product.id}`
                    }
                    style={{ color: "inherit", textDecoration: "none" }}
                >
                    <CardMedia
                        sx={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover"
                        }}
                        component="img"
                        height="240"
                        image={
                            product?.ProductImages.length
                                ? `${imageBaseUrl}${product?.ProductImages[0]?.image}`
                                : NoImage
                        }
                    />
                </Link>
                <CardContent>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Typography gutterBottom variant="body1">
                            {product?.title?.length > 17
                                ? product?.title?.substr(0, 14) + "\u2026"
                                : product?.title}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            <div style={{ fontWeight: 500 }}>
                                €{product?.price}
                            </div>
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default Product;
