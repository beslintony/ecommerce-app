import {
    AppBar,
    Button,
    Container,
    InputBase,
    Toolbar,
    Tooltip
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { setProductName } from "../services/allProductsSlice";
import { getProducts } from "../services/productAction";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    display: "flex",
    borderRadius: "24px",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    minWidth: "100%",
    height: "3.5rem",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
    }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    minHeight: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const FilterIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(1, 2),
    height: "100%",
    position: "relative",
    pointerEvents: "auto",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    flex: 1,
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        fontSize: 28,
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
}));

const SearchFilterBar = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const { search } = useSelector((state) => state.allProducts);
    const dispatch = useDispatch();

    const searchString = () => {
        let queryString = ``;
        if (search.productName.length > 0) {
            queryString += `product_name=${search.productName}&`;
        }
        if (search.minPrice.length > 0) {
            queryString += `price_min=${search.minPrice}&`;
        }
        if (search.maxPrice.length > 0) {
            queryString += `price_max=${search.maxPrice}&`;
        }
        return queryString;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <AppBar
                sx={{ padding: "3px", color: "white" }}
                position="sticky"
                color="secondary"
            >
                <Toolbar component="nav">
                    <Container>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        dispatch(setProductName(value));
                                        dispatch(getProducts(searchString));
                                    }
                                }}
                            />
                            <Button
                                onClick={handleClickOpen}
                                sx={{ color: "white" }}
                            >
                                <Tooltip title="Filter">
                                    <FilterIconWrapper>
                                        <FilterAltIcon />
                                    </FilterIconWrapper>
                                </Tooltip>
                            </Button>
                        </Search>
                    </Container>
                </Toolbar>
                <Filter open={open} setOpen={setOpen} />
            </AppBar>
        </>
    );
};

export default SearchFilterBar;
