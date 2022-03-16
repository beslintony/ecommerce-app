import React, { useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";

const Container = styled("section")(({ theme }) => ({
    display: "flex",
    flexDirection: "column"
}));
const Dropzone = styled("div")(({ theme }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
}));
const ThumbsContainer = styled("aside")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
}));
const Thumb = styled("div")(({ theme }) => ({
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
}));
const ThumbInner = styled("div")(({ theme }) => ({
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
}));
const ImageView = styled("img")(({ theme }) => ({
    display: "block",
    width: "auto",
    height: "100%"
}));
const Text = styled("p")(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
        fontWeight: "bold"
    }
}));

// image uploader component using react-dropzone
const DragNDrop = ({ files, setFiles }) => {
    const [errors, setErrors] = useState("");

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        maxSize: 1024 * 1024 * 5,
        onDrop: (acceptedFiles, fileRejections) => {
            setFiles(
                acceptedFiles.map(
                    (file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file)
                        }),
                    setErrors("")
                )
            );
            fileRejections.forEach((file) => {
                file.errors.forEach((err) => {
                    if (err.code === "file-too-large") {
                        setErrors(`Error: ${err.message}`);
                    }

                    if (err.code === "file-invalid-type") {
                        setErrors(`Error: ${err.message}`);
                    }
                });
            });
        }
    });
    // create thumbs for preview
    const thumbs = files?.map((file) => (
        <Thumb key={file.name}>
            <ThumbInner>
                <ImageView alt="img" src={file.preview} />
            </ThumbInner>
        </Thumb>
    ));
    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files?.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <Container>
            <Dropzone {...getRootProps()}>
                <input {...getInputProps()} />
                <Text>
                    {/* classsic text for the image upload area */}
                    Drag &apos; n &apos; drop some files here, or click to
                    select files
                </Text>
            </Dropzone>
            {/* Error Message for not supported images */}
            <Text style={{ color: "red", padding: 5, margin: 0, fontSize: 14 }}>
                {errors}
            </Text>
            {files.length ? <ThumbsContainer>{thumbs}</ThumbsContainer> : null}
        </Container>
    );
};

export default DragNDrop;
