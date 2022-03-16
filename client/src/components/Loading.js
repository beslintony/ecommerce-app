import { Backdrop, Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh"
            }}
        >
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default Loading;
