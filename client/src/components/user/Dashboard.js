import {
    Breadcrumbs,
    Card,
    CardContent,
    Container,
    Grid,
    Tooltip,
    Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Orders from "../../assets/box.png";
import Profile from "../../assets/programmer.png";
import SoldProducts from "../../assets/sold.png";
import MyProducts from "../../assets/personal.png";
import CreateProducts from "../../assets/createproduct.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../../services/userAction";

export const buyerLinks = [
    {
        title: "Orders",
        path: "/user/orders",
        icon: Orders
    },
    {
        title: "Profile",
        path: "/user/profile",
        icon: Profile
    }
];
export const sellerLinks = [
    {
        title: "My Products",
        path: "/user/myproducts",
        icon: MyProducts
    },
    {
        title: "Add Product",
        path: "/user/addproduct",
        icon: CreateProducts
    },
    {
        title: "Profile",
        path: "/user/profile",
        icon: Profile
    },
    {
        title: "Sold Products",
        path: "/user/soldproducts",
        icon: SoldProducts
    }
];
export const commonLinks = [
    {
        title: "Orders",
        path: "/user/orders",
        icon: Orders
    },
    {
        title: "Sold Products",
        path: "/user/soldproducts",
        icon: SoldProducts
    },
    {
        title: "Profile",
        path: "/user/profile",
        icon: Profile
    },
    {
        title: "My Products",
        path: "/user/myproducts",
        icon: MyProducts
    },
    {
        title: "Add Product",
        path: "/user/addproduct",
        icon: CreateProducts
    }
];

const ImgWrapper = styled("div")(({ theme }) => ({
    padding: "1rem",
    maxWidth: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}));

const Img = styled("img")(({ theme }) => ({
    maxWidth: "100%",
    objectFit: "fill"
}));

const Dashboard = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.login);

    const { user } = useSelector((state) => state.user);
    const { roles } = user;
    const history = useHistory();
    const location = useLocation();

    const buyer = roles?.find((el) => el === "buyer");
    const seller = roles?.find((el) => el === "seller");
    const common =
        roles?.find((el) => el === "seller") &&
        roles?.find((el) => el === "buyer");

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    useEffect(() => {
        (isAuth || localStorage.getItem("userToken")) &&
            history.push(location?.state?.next?.pathname || "/user/dashboard");
    }, [isAuth, history, location?.state?.next?.pathname]);

    const getDashboard = (role, dashboardLinks) => {
        if (role) return dashboardLinks;
    };

    const currentUser =
        getDashboard(common, commonLinks) ||
        getDashboard(buyer, buyerLinks) ||
        getDashboard(seller, sellerLinks);
    return (
        <>
            <Container>
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: "1rem" }}>
                    <Typography color="text.primary">Dashboard</Typography>
                </Breadcrumbs>
                <Typography variant="h5" sx={{ margin: "2rem 2rem" }}>
                    My Account
                </Typography>
            </Container>
            <Container
                sx={{
                    marginTop: "3rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    {currentUser?.map((dashCard, index) => (
                        <Grid item key={index}>
                            <Card
                                sx={{
                                    minWidth: 275,
                                    backgroundColor: "#ffffff",
                                    backgroundImage: ` linear-gradient(60deg, #ffffff 2%, #f7e1ec 74%)`
                                }}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Grid item sx={{ cursor: "pointer" }}>
                                        <Tooltip title={dashCard.title}>
                                            <Link
                                                to={dashCard.path}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "inherit"
                                                }}
                                            >
                                                <CardContent>
                                                    <ImgWrapper>
                                                        <Img
                                                            src={dashCard.icon}
                                                            alt={"alt"}
                                                        />
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                margin: "0 1rem"
                                                            }}
                                                        >
                                                            {dashCard.title}
                                                        </Typography>
                                                    </ImgWrapper>
                                                </CardContent>
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Dashboard;
