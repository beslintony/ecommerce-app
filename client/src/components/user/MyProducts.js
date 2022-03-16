import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import PreviewIcon from "@mui/icons-material/Preview";
import { Alert, Breadcrumbs, Button, Container } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CustomizedDialogs, Loading } from "..";
import moment from "moment";
import { useEffect, useState } from "react";
import { deleteProduct } from "../../services/productsApi";
import {
    deleteProductFail,
    deleteProductPending,
    deleteProductSuccess
} from "../../services/deleteProductSlice";
import { getUserProfile } from "../../services/userAction";

function createData(title, price, postedOn, city, postcode, status, actions) {
    return {
        title,
        price,
        postedOn,
        city,
        postcode,
        status,
        actions
    };
}

const columns = [
    { id: "title", label: "Title", minWidth: 170, align: "left" },
    { id: "price", label: "Price", minWidth: 100, align: "center" },
    {
        id: "postedOn",
        label: "Posted On",
        minWidth: 160,
        align: "center"
    },
    {
        id: "city",
        label: "City",
        minWidth: 140,
        align: "center"
    },
    {
        id: "postcode",
        label: "Postcode",
        minWidth: 140,
        align: "center"
    },
    {
        id: "status",
        label: "Status",
        minWidth: 140,
        align: "center"
    },
    {
        id: "actions",
        label: "Actions",
        minWidth: 170,
        align: "center"
    }
];

const MyProducts = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteProductId, setProductDeleteId] = useState(0);
    const [openDelete, setOpenDelete] = useState(false);
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        user: { products, isLoading }
    } = useSelector((state) => state.user);

    const { isLoading: deleteIsLoading, error: deleteError } = useSelector(
        (state) => state.deleteProduct
    );

    useEffect(() => {
        dispatch(getUserProfile());
        msg &&
            setTimeout(() => {
                setMsg("");
            }, 5000);
    }, [dispatch, msg]);

    const rows = products?.map((el) =>
        createData(
            el.title,
            `€ ${el.price}`,
            moment(el.createdAt).format("DD.MM.YYYY"), //TODO: needs to be changed with posted on
            el.city,
            el.postcode,
            el.approve_status ? "Accepted" : "Pending",
            <>
                <Tooltip title="Update">
                    <IconButton
                        onClick={() =>
                            history.push(`/user/myproducts/product/${el.id}`)
                        }
                    >
                        <UpdateIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Preview">
                    <IconButton
                        onClick={() =>
                            history.push(`/products/product/${el.id}`)
                        }
                    >
                        <PreviewIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        onClick={() => {
                            setOpenDelete(true);
                            setProductDeleteId(el.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </>
        )
    );
    // handle change for the page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // handles rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleDelete = async () => {
        dispatch(deleteProductPending());

        try {
            const deleteInfo = await deleteProduct(deleteProductId);
            if (deleteInfo.success === false) {
                setMsg(deleteInfo.message);
                setOpenDelete(false);
                return dispatch(deleteProductFail(deleteInfo.message));
            }
            dispatch(deleteProductSuccess());
            setMsg(deleteInfo.message);
            setOpenDelete(false);
        } catch (error) {
            dispatch(deleteProductFail(error.message));
        }
    };

    const FooterDelete = () => {
        return (
            <>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        setOpenDelete(false);
                    }}
                >
                    Back
                </Button>
            </>
        );
    };

    return (
        <Container>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: "1rem" }}>
                <Link
                    style={{
                        textDecoration: "none",
                        color: "inherit"
                    }}
                    to="/user/dashboard"
                >
                    Dashboard
                </Link>
                <Typography color="text.primary">My Products</Typography>
            </Breadcrumbs>
            <Typography variant="h5" sx={{ margin: "2rem 2rem" }}>
                My Products
            </Typography>
            {!deleteIsLoading && msg && (
                <Box
                    sx={{
                        margin: 2
                    }}
                >
                    <Alert variant="filled" severity="error">
                        {msg}
                    </Alert>
                </Box>
            )}
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns?.map((column, index) => (
                                        <TableCell
                                            key={index}
                                            align={column?.align}
                                            style={{
                                                minWidth: column.minWidth
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            {!isLoading ? (
                                <>
                                    <TableBody>
                                        {rows
                                            ?.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            ?.map((row, index) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={index}
                                                    >
                                                        {columns.map(
                                                            (column) => {
                                                                const value =
                                                                    row[
                                                                        column
                                                                            .id
                                                                    ];
                                                                return (
                                                                    <TableCell
                                                                        key={
                                                                            column.id
                                                                        }
                                                                        align={
                                                                            column.align
                                                                        }
                                                                    >
                                                                        {value}
                                                                    </TableCell>
                                                                );
                                                            }
                                                        )}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </>
                            ) : (
                                <Loading />
                            )}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={rows?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <CustomizedDialogs
                    open={openDelete}
                    setOpen={setOpenDelete}
                    title="Delete"
                    isFooter
                    footerChildren={FooterDelete()}
                >
                    <Typography>
                        {deleteError ? (
                            msg
                        ) : (
                            <span>
                                Are you sure you want to Delete this Product?
                                This action later cannot be reversed.
                            </span>
                        )}
                    </Typography>
                </CustomizedDialogs>
            </Box>
        </Container>
    );
};

export default MyProducts;
