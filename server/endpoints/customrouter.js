const express = require("express");
const router = express.Router();
const login = require("./login");
const users = require("./users");
const products = require("./products");
const order = require("./orderSaving");
const analysis = require("./analysis");
const authadmin = require("../auth/checkauth_admin");
const authbuyer = require("../auth/checkauth_buyer");
const authseller = require("../auth/checkauth_seller");
const authgeneral = require("../auth/checkauth_general");
const slider = require("../endpoints/slider");
const multer = require("multer");
const jwtdecode = require("jwt-decode");

//*******Users Routes*******
router.post("/login", login.loginuser); //Login Route
router.post("/users", users.createuser); //Route to Create a New User 
router.get("/users", authadmin, users.getallusers);  //Get All users data with Admin Token Request 
router.get("/user/:id", users.getUserDetails); //Get Specific user data with providing id in param and no token needed
router.get("/user_profile", authgeneral, users.getUserProfileDetails);  //Get Logged In user Profile details with Auth Token
router.patch("/user-update", authgeneral, users.updateCurrentUser);  //Update user by using user's access Token


// uploading the images using multer
let storageProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.PROFILE_STORAGE);
    },
    filename: function (req, file, cb) {
        var token = req.headers["authorization"];
        var decoded = jwtdecode(token);
        const uniqueSuffix =
            decoded.id +
            "-" +
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) + "." + file.originalname.split(".").pop();
        cb(null, "User-" + uniqueSuffix);
    },
});


router.get("/slider", slider.slider);




let profileUpload = multer({ storage: storageProfile });
//***************** Upload Profile Picture *********************
router.post(
    "/postProfileImage",
    profileUpload.single("file"),
    authgeneral,
    users.postProfileImage
);
//****************** Below Route Not needed to update user *******************
//router.patch("/users/:email", authgeneral, users.updateuser);
//****************************************************************************
//*************** Below route to delete user from user email by using admin access token *************
router.delete("/users/:email", authadmin, users.deleteuser);
//****************************************************************
router.post("/orders", authbuyer, order.orderSave); //route 
router.get("/analysis/seller/:sellerId", authseller, analysis.sellerAnalysis); // seller Analysis
router.get("/analysis/buyer/:buyerId", authbuyer, analysis.buyerAnalysis); //buyer Analysis
router.get("/analysis/products/seller/:sellerId", authseller, analysis.getAllProducts); //to get all products: getAllProducts

//******* Products Routes*******
router.get("/products",products.getAllProducts); // Get all products list. No token needed
router.get("/product/:id",products.getSingleProduct); // Get details of a single product. No token needed
//router.post("/product",authseller,products.postProduct); // Post product by seller using Seller Auth Token without image - API removed
router.patch("/product/:id", authseller, products.updateProductSeller); // Update product by seller using Seller Auth Token
router.delete("/product/:id",authseller,products.productDelete); // Delete product by seller using Seller Auth Token

// ************************Upload Product Images ********************

let storageProductImages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.PRODUCT_IMAGES_STORAGE);
    },
    filename: function (req, file, cb) {
        var token = req.headers["authorization"];
        var decoded = jwtdecode(token);
        const uniqueSuffix =
            decoded.id +
            "-" +
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) + "." + file.originalname.split(".").pop();
        cb(null, "Product-" + uniqueSuffix);
    },
});

let productsImagesUpload = multer({ storage: storageProductImages });
//***************** Product Post / Create with max of 12 image attachments ****************
router.post(
    "/product",
    productsImagesUpload.array("file",12),
    authseller,
    products.postProductWithImages
);
//*******Admin Routes*******

module.exports = router;
