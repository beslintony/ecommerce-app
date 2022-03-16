import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const OrderItem = ({ orderItem }) => {
    const Wrapper = styled("div")(({ theme }) => ({
        borderBottom: "1px solid violet",
        paddingBottom: "20px"
    }));

    const Content = styled(Typography)(({ theme }) => ({
        margin: "8px"
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

    const imageBaseUrl = "http://localhost:3001/product/image/";

    return (
        <>
            <Container>
                <Wrapper>
                    <h3>{orderItem.title}</h3>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Content>Price: €{orderItem.oneUnitPrice}</Content>
                        </Grid>
                        <Grid item>
                            <Content>
                                No. of Items: {orderItem.quantity}
                            </Content>{" "}
                        </Grid>
                        <Grid item>
                            <Content>
                                {"Total: € "}
                                {orderItem.totalPrice}
                            </Content>
                        </Grid>
                        <Grid item>
                            <ImgWrapper>
                                <Img
                                    src={`${imageBaseUrl}${orderItem.image}`}
                                    alt={orderItem.title}
                                />
                            </ImgWrapper>
                        </Grid>
                    </Grid>
                </Wrapper>
            </Container>
        </>
    );
};

export default OrderItem;
