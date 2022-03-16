import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { useEffect } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import {
    Button,
    Grid,
    Typography
} from "@mui/material";
import { styled } from "@mui/system";

import { getSliders } from "../services/sliderApi";
import { Loading } from "./";

const Container = styled("div")({
    width: "100%",
    height: `calc(100vh - 68.5px)`,
    overflow: "hidden"
});

const Slide = styled(Grid)(({ bg }) => ({
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    backgroundColor: bg
}));

const ImgContainer = styled("div")({
    flex: 1
});

const InfoContainer = styled("div")({
    flex: 1,
    padding: "50px"
});

const Title = styled(Typography)(({ theme }) => ({
    fontSize: "70px",
    [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
        fontWeight: 700
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "18px",
        fontWeight: 700
    }
}));

const Desc = styled(Typography)(({ theme }) => ({
    margin: `50px 0px`,
    fontSize: "20px",
    fontWeight: 500,
    letterSpacing: "3px",
    [theme.breakpoints.down("sm")]: {
        margin: `auto`,
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "2px"
    },
    [theme.breakpoints.down("md")]: {
        margin: `auto`,
        fontSize: "16px",
        fontWeight: 500,
        letterSpacing: "2px"
    }
}));

const ButtonSlider = styled(Button)({
    padding: "10px",
    fontSize: "20px",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: "#000000",
    border: "2px solid black"
});

const Slider = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSliders());
    }, [dispatch]);

    const { sliders, isLoading } = useSelector((state) => state.slider);
    const imageBaseUrl = "http://localhost:3001/product/image/";

    return (
        <Container sx={{ marginBottom: "5px" }}>
            <Carousel infiniteLoop>
                {sliders?.data?.map((item) => (
                    <div key={item.id}>
                        <Slide>
                            <ImgContainer>
                                <img
                                    alt={item?.featured_title}
                                    src={`${imageBaseUrl}${item?.featured_image}`}
                                    style={{
                                        height: "80%",
                                        objectFit: "fit"
                                    }}
                                />
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{item.featured_title}</Title>
                                <Desc>{item.featured_desc}</Desc>
                                <ButtonSlider>
                                    <Link
                                        to={`products/product/${item.product_id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit"
                                        }}
                                    >
                                        SHOP NOW
                                    </Link>
                                </ButtonSlider>
                            </InfoContainer>
                        </Slide>
                    </div>
                ))}
            </Carousel>
            {isLoading && <Loading />}
        </Container>
    );
};

export default Slider;
