const app = require("express")();
const path = require("path");
const express = require("express");

const endpoints = require("./endpoints/base");

const env = process.env;

app.use(endpoints);

// end point for user profile image
app.use(
    "/user/profileimage",
    express.static(path.join(__dirname, "./public/storage/profile_images"))
);
// end point for product images
app.use(
    "/product/image",
    express.static(path.join(__dirname, "./public/storage/product_images"))
);

//production
// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build", "index.html"));
// });

const PORT = 3001;

app.listen(PORT, console.log(`Server running on port ${PORT}.`));
