import React from "react";
import { Slider, Products, SearchFilterBar } from "../components";

const Home = () => {
    return (
        <>
            <Slider />
            <SearchFilterBar />
            <Products />
        </>
    );
};

export default Home;
