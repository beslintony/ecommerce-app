import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    Typography,
    TextField,
    Button
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setMaxPrice,
    setMinPrice
} from "../services/allProductsSlice";
import { getProducts } from "../services/productAction";

const Filter = ({ open, setOpen }) => {
    const { search } = useSelector((state) => state.allProducts);
    const dispatch = useDispatch();

    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");

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

    return (
        <div>
            <div>
                <Dialog open={open}>
                    <DialogTitle>Filter Products</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        margin: "5px 0"
                                    }}
                                    color="secondary"
                                >
                                    <Typography>Price</Typography>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <TextField
                                            sx={{
                                                margin: "5px 0",
                                                width: "45%"
                                            }}
                                            id="outlined-basic"
                                            label="Min Price"
                                            variant="outlined"
                                            color="secondary"
                                            value={priceMin}
                                            onChange={(e) =>
                                                setPriceMin(e.target.value)
                                            }
                                        />
                                        <TextField
                                            sx={{
                                                margin: "5px 0",
                                                width: "45%"
                                            }}
                                            id="outlined-basic"
                                            label="Max Price"
                                            variant="outlined"
                                            color="secondary"
                                            value={priceMax}
                                            onChange={(e) =>
                                                setPriceMax(e.target.value)
                                            }
                                        />
                                    </div>
                                </FormControl>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpen(false)}
                            variant="contained"
                            color="secondary"
                        >
                            Back
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                dispatch(setMinPrice(priceMin));
                                dispatch(setMaxPrice(priceMax));
                                dispatch(getProducts(searchString));
                            }}
                        >
                            Filter
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Filter;
