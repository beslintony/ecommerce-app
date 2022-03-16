const Product = require("../db/model/Product");
const ProductImage = require("../db/model/ProductImage");
const bcryptjs = require("bcryptjs");
const search = require("../utils/search");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
//const db = require('../db');
const express = require("express");
const User = require("../db/model/User");
const jwtDecode = require("jwt-decode");
const { SuccessfulResponse, FailedResponse } = require("../utils/response");

//************** Get All Products Details *****************
const getAllProducts = async function (req, res) {
    var minPrice = 0;
    var maxPrice = 1000000;
    var productName = "";
    var categoryName = "";
    if (req.query.price_min !== "undefined" && req.query.price_min !== undefined && req.query.price_min !== "") {
        minPrice = req.query.price_min;
    }
    if (req.query.price_max !== "undefined" && req.query.price_max !== undefined && req.query.price_max !== "") {
        maxPrice = req.query.price_max;
    }
    if (req.query.product_name !== "undefined" && req.query.product_name !== undefined && req.query.product_name !== "") {
        productName = req.query.product_name;
    }
/*
    if (req.query.category_name !== "undefined" && req.query.category_name !== undefined && req.query.category_name !== "") {
        categoryName = req.query.category_name;
    }
*/
    const product = await Product.findAll({
        where: {
            price: {
                [Op.between]: [minPrice, maxPrice],
            },
            [Op.or] :{
                title: {
                    [Op.like]: "%" + productName + "%",
                },
                category: {
                    [Op.like]: "%" + productName + "%",
                }
            },
        },
        include: [ProductImage]
    });
    return res.json({
        success: true,
        message: "Product details",
        records: product.length,
        data: product,
    });
};
exports.getAllProducts = getAllProducts;

//************** Save a Product *****************
const postProduct = async function (req, res){

    var token = req.headers["authorization"];
    var decoded = jwtDecode(token);
    const userId = decoded.id;

    let product = Product.build({
        seller_id : userId,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        postcode: req.body.postcode,
        city: req.body.city,
        street: req.body.street,
        sellerName: req.body.sellerName,
        contact: req.body.contact,
        approve_status: 1
    });

    try{
        await product.save();
        return res.json(new SuccessfulResponse("New product successfully created", [product]));
    }
    catch (e){
        return res.json(new FailedResponse(e.message));
    }


};
exports.postProduct = postProduct;

//************** Update Existing Product *****************
const updateProductSeller = async function(req, res){
    var token = req.headers["authorization"];
    var decoded = jwtDecode(token);
    const userId = decoded.id;

    const existingProduct = await Product.findOne({
        where: {
            [Op.and] :[{ id: req.params.id  } , {seller_id: userId} ]
        }
    });
    if(existingProduct){
        try{
            await existingProduct.update({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                postcode: req.body.postcode,
                city: req.body.city,
                street: req.body.street,
                sellerName: req.body.sellerName,
                contact: req.body.contact,
            });
            console.log("Tutor Course Updated: " + existingProduct.title);
            return res.json(
                    new SuccessfulResponse(
                        "Product " + existingProduct.title + " successfully updated",
                        [existingProduct]
                    )
                );
        }
        catch (e){
            return res.json(new FailedResponse(e.message));
        }
    }
    else {
        return res.json(new FailedResponse("Product not found or already deleted!"));
    }
};
exports.updateProductSeller = updateProductSeller;

//************** Get Single Product Details *****************
const getSingleProduct = async function(req, res){
    const existingProduct = await Product.findOne({
        where: {
            [Op.and] :[{ id: req.params.id  } ]
        },
        include: [ProductImage]
    });

    if(existingProduct){
        return res.json(
            new SuccessfulResponse("Product Details!", existingProduct)
        );
    }
    else {
        return res.json(new FailedResponse("Product not found or already deleted!"));
    }
};
exports.getSingleProduct = getSingleProduct;

const productDelete = async function (req, res){
    var token = req.headers["authorization"];
    var decoded = jwtDecode(token);
    const userId = decoded.id;

    const existingProduct = await Product.findOne({
        where: {
            [Op.and] :[{ id: req.params.id  } , {seller_id: userId} ]
        }
    });
    if(existingProduct){
        try{
            await existingProduct.destroy();
            return res.json(
                new SuccessfulResponse(existingProduct.title + " Successfully Deleted!", existingProduct)
            );
        }
        catch (e){
            return res.json(new FailedResponse(e.message));
        }

    }
    else {
        return res.json(new FailedResponse("Product not found for this user or already deleted!"));
    }
};
exports.productDelete = productDelete;

//************** Save a Product with Images *****************
const postProductWithImages = async function (req, res){

    var token = req.headers["authorization"];
    var decoded = jwtDecode(token);
    const userId = decoded.id;

    let product = Product.build({
        seller_id : userId,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        postcode: req.body.postcode,
        city: req.body.city,
        street: req.body.street,
        sellerName: req.body.sellerName,
        contact: req.body.contact,
        approve_status: 1
    });

    try{
        await product.save();
        const files = req.files;
        //console.log('files: ' + files);
        if (files){
            //console.log('files exist: ' + files);
            for (let i=0; i < files.length; i++){
                let file = files[i];
                //console.log('req.file.path: ' + file.path);
                //console.log('req.file.filename: ' + file.filename);
                await saveProductImage(product.id,file.filename,res);
            }
        }
        return res.json(new SuccessfulResponse("New product successfully created", [product]));
    }
    catch (e){
        return res.json(new FailedResponse(e.message));
    }


};
exports.postProductWithImages = postProductWithImages;

async function saveProductImage(productId, fileName, res){
    //console.log('productId in saveProductImage: ' + productId);
    //console.log('fileName in saveProductImage: ' + fileName);
    let thisProductImage = ProductImage.build({
        product_id: productId,
        image: fileName
    });
    await thisProductImage.save().catch((e) => {
        console.log(e);
        return res.json(new FailedResponse(e.message));
    });
}

exports.saveProductImage = saveProductImage;