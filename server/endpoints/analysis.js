const { QueryTypes } = require('sequelize');
const db = require("../db/db")

module.exports = {
    "sellerAnalysis" : async (req, res) => {

        let sellerId = req.params.sellerId;
        let result;

        try {

            result = await db.query(
                'SELECT ANY_VALUE(TTT.firstName) as firstName, ANY_VALUE(TTT.lastName) as lastName, TTT.productId, ANY_VALUE(ecommerce_web.products.title) as title, ANY_VALUE(TTT.seller_id) as seller_id, ANY_VALUE(TTT.quantity) as quantity, ANY_VALUE(TTT.oneUnitPrice) as oneUnitPrice, ANY_VALUE(TTT.totalPrice) as totalPrice, ANY_VALUE(TTT.image) as image FROM \
                (SELECT ecommerce_web.users.firstName, ecommerce_web.users.lastName, TT.productId, TT.seller_id, TT.quantity, TT.oneUnitPrice, TT.totalPrice, TT.image FROM \
                    (SELECT T.productId, T.seller_id, T.quantity, T.oneUnitPrice, T.totalPrice, ecommerce_web.product_images.image FROM \
                        (SELECT productId, seller_id, quantity, oneUnitPrice, totalPrice FROM \
                            ecommerce_web.order_products where orderId in (SELECT id from ecommerce_web.orders where seller_id=?)) as T \
                            INNER JOIN ecommerce_web.product_images on T.productId=ecommerce_web.product_images.product_id) as TT \
                            INNER JOIN ecommerce_web.users on ecommerce_web.users.id=?) as TTT INNER JOIN ecommerce_web.products on TTT.productId=ecommerce_web.products.id GROUP BY productId',
                {
                    replacements: [
                        sellerId,
                        sellerId,
                    ],
                    type: QueryTypes.SELECT,
                    raw:true
            });
            
        }
        catch(error) {
            res.send({success:false, message: "Seomething went wrong"});
            throw(error);
        }

        res.send({"success":true, "message": "Successfull!", "data": result});
    },
    "buyerAnalysis" : async (req, res) => {

        let buyerId = req.params.buyerId;
        let result;

        try {

            result = await db.query(
                'SELECT ANY_VALUE(TTT.firstName) as firstName, ANY_VALUE(TTT.lastName) as lastName, TTT.productId, ANY_VALUE(ecommerce_web.products.title) as title, ANY_VALUE(TTT.seller_id) as seller_id, ANY_VALUE(TTT.quantity) as quantity, ANY_VALUE(TTT.oneUnitPrice) as oneUnitPrice, ANY_VALUE(TTT.totalPrice) as totalPrice, ANY_VALUE(TTT.image) as image FROM \
                (SELECT ecommerce_web.users.firstName, ecommerce_web.users.lastName, TT.productId, TT.seller_id, TT.quantity, TT.oneUnitPrice, TT.totalPrice, TT.image FROM \
                    (SELECT T.productId, T.seller_id, T.quantity, T.oneUnitPrice, T.totalPrice, ecommerce_web.product_images.image FROM \
                        (SELECT productId, seller_id, quantity, oneUnitPrice, totalPrice FROM \
                            ecommerce_web.order_products where orderId in (SELECT id from ecommerce_web.orders where buyer_id=?)) as T \
                            INNER JOIN ecommerce_web.product_images on T.productId=ecommerce_web.product_images.product_id) as TT \
                            INNER JOIN ecommerce_web.users on ecommerce_web.users.id=?) as TTT INNER JOIN ecommerce_web.products on TTT.productId=ecommerce_web.products.id GROUP BY productId',
                {
                    replacements: [
                        buyerId,
                        buyerId,
                    ],
                    type: QueryTypes.SELECT,
                    raw:true
            });
            
        }
        catch(error) {
            res.send({success:false, message: "Something went wrong!"});
            throw(error);
        }

        res.send({"success":true, "message": "Successfull!", "data": result});
    },

    "getAllProducts": async (req, res) => {
        let sellerId = req.params.sellerId;
        let result;

        try {

            result = await db.query(
                'SELECT * FROM products WHERE products.seller_id = ?',
                {
                    replacements: [
                        sellerId,
                    ],
                    type: QueryTypes.SELECT,
                    raw:true
            });
        } catch(error) {
            res.send({success:false, message: "Something went wrong!"});
            throw(error);
        }
        res.send({"success":true, "message": "Successfull!", "data": result});
    }
};