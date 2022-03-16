import { Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, Product } from ".";
import { getProducts } from "../services/productAction";

const Products = () => {
    const dispatch = useDispatch();
    const { search, products, isLoading, error } = useSelector(
        (state) => state.allProducts
    );

    useEffect(() => {
        let queryString = "";

        if (search.productName.length > 0) {
            queryString += `product_name=${search.productName}&`;
        }
        if (search.minPrice.length > 0) {
            queryString += `price_min=${search.minPrice}&`;
        }
        if (search.maxPrice.length > 0) {
            queryString += `price_max=${search.maxPrice}&`;
        }

        dispatch(getProducts(queryString));
    }, [
        dispatch,
        search.maxPrice,
        search.minPrice,
        search.productName
    ]);

    if (isLoading) return <Loading />;
    return (
        <main
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%"
            }}
        >
            <Container sx={{ margin: "3rem 0" }}>
                {error.length > 1 ? (
                    <div>There is currently no results available</div>
                ) : (
                    <Grid
                        container
                        direction="row"
                        justifyContent={{ xs: "center", md: "stretch" }}
                        alignItems="stretch"
                        spacing={{ xs: 3, md: 4 }}
                    >
                        {products?.success &&
                            products?.data?.map((product) => (
                                <Grid item key={product.id}>
                                    <Product
                                        isLoading={isLoading}
                                        product={product}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                )}
            </Container>
        </main>
    );
};

export default Products;
