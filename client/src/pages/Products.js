import React from "react";
import {
    Products as ProductsComp,
    SearchFilterBar
} from "../components";

const Products = () => {
    return (
        <>
            <SearchFilterBar />
            <ProductsComp />
        </>
    );
};

export default Products;
