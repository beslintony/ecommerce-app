import { Alert, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragNDrop, Loading } from "..";
import {
    updateProfileImageFail,
    updateProfileImagePending,
    updateProfileImageSuccess
} from "../../services/updateProfileImageSlice";
import { getUserProfile } from "../../services/userAction";
import { updateProfileImage } from "../../services/userApi";

const UpdateProfileImage = ({ files, setFiles, setOpen }) => {
    const dispatch = useDispatch();

    const { isLoading, error, isUpdated } = useSelector(
        (state) => state.updateProfileImage
    );
    const [successMsg, setSuccessMsg] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        dispatch(updateProfileImagePending());
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("file", files[i]);
        }
        try {
            const updatedUser = await updateProfileImage(data);
            if (updatedUser.success === false) {
                return dispatch(updateProfileImageFail(updatedUser.message));
            }
            dispatch(updateProfileImageSuccess());
            setSuccessMsg(updatedUser.message);
            dispatch(getUserProfile());
            setFiles([]);
            setOpen(false);
        } catch (error) {
            dispatch(updateProfileImageFail(error.message));
        }
    };
    return (
        <>
            {error && (
                <Box
                    sx={{
                        marginTop: 2
                    }}
                >
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                </Box>
            )}
            {isUpdated && successMsg && (
                <Box
                    sx={{
                        marginTop: 2
                    }}
                >
                    <Alert variant="filled" severity="success">
                        {successMsg}
                    </Alert>
                </Box>
            )}
            <Box
                component="form"
                onSubmit={onSubmitHandler}
                noValidate
                sx={{ mt: 1 }}
            >
                {isLoading && <Loading />}
                <Grid container>
                    <br></br>
                    {/* Image upload */}
                    <Box
                        sx={{
                            paddingLeft: "1rem",
                            width: "100%"
                        }}
                    >
                        <Typography gutterBottom variant="h6" component="body">
                            IMAGES
                        </Typography>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <DragNDrop files={files} setFiles={setFiles} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item xs={3}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default UpdateProfileImage;
