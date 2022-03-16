import {
    useCallback,
    useEffect,
    useState
} from "react";

import decode from "jwt-decode";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    Link,
    useHistory,
    useLocation
} from "react-router-dom";

import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";

import { initializeSearch } from "../services/allProductsSlice";
import { getTotals } from "../services/cartSlice";
import {
    loginFail,
    loginSuccess
} from "../services/loginSlice";
import { getUserProfile } from "../services/userAction";
import { getUserSuccess } from "../services/userSlice";

const NavBar = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { isAuth } = useSelector((state) => state.login);
    const { pathname } = useLocation();

    const history = useHistory();

    const imageBaseUrl = "http://localhost:3001/user/profileimage/";

    const { user: currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        !isAuth &&
            localStorage.getItem("userToken") &&
            dispatch(loginSuccess());
    }, [dispatch, isAuth]);

    useEffect(() => {
        localStorage.getItem("userToken") && dispatch(getUserProfile());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    // checks for expiry of the token
    useEffect(() => {
        if (pathname && localStorage.getItem("userToken")) {
            const decodedToken = decode(localStorage.getItem("userToken"));

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                localStorage.removeItem("userToken");
                dispatch(getUserSuccess({ user: {} }));
                dispatch(loginFail("token expired"));
                history.push("/signin");
            }
        }
    }, [dispatch, history, pathname]);

    useEffect(() => {
        pathname && dispatch(initializeSearch())
    }, [dispatch, pathname]);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleLogout = useCallback(() => {
        localStorage.removeItem("userToken");
        dispatch(getUserSuccess({ user: {} }));
        dispatch(loginFail(""));
        history.push("/");
        setAnchorElUser(null);
    });

    const handleProfile = () => {
        history.push("/user/profile");
        setAnchorElUser(null);
    };
    const handleDashboard = () => {
        history.push("/user/dashboard");
        setAnchorElUser(null);
    };

    return (
        <AppBar
            sx={{ backgroundColor: "#0f1111" }}
            color="transparent"
            position="static"
        >
            <div>
                <Toolbar
                    sx={{ display: "flex", alignItems: "space-between" }}
                    disableGutters
                >
                    <Box
                        sx={{
                            marginLeft: "0.5rem",
                            flexGrow: 1
                        }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                color: "white",
                                mr: 2,
                                fontWeight: 600
                            }}
                        >
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit"
                                }}
                                to="/"
                            >
                                FULSTOREDA
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0, marginRight: "0.5rem" }}>
                        <Tooltip title="Cart">
                            <Badge
                                sx={{ color: "#ffff", mr: 2 }}
                                badgeContent={cart.cartTotalQuantity}
                            >
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit"
                                    }}
                                    to="/cart"
                                >
                                    <ShoppingCartIcon sx={{ color: "#ffff" }} />
                                </Link>
                            </Badge>
                        </Tooltip>
                        {isAuth ? (
                            <>
                                <Tooltip title="Profile settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt={currentUser?.firstName}
                                            src={
                                                `${imageBaseUrl}${currentUser?.profileImage}` ??
                                                currentUser?.firstName
                                            }
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleProfile}>
                                        <Typography textAlign="center">
                                            Profile
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleDashboard}>
                                        <Typography textAlign="center">
                                            Dashboard
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => history.push("/signin")}
                                    sx={{
                                        color: "white"
                                    }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    onClick={() => history.push("/signup")}
                                    sx={{
                                        color: "white"
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </div>
        </AppBar>
    );
};

export default NavBar;
