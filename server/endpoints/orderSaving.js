const { QueryTypes } = require('sequelize');
const db = require("../db/db")

module.exports = {
    "orderSave" : async (req, res) => {

        let sellerId = req.body.sellerId;
        let buyerId = req.body.buyerId;
        let price = req.body.totalPrice;
        let product_list = req.body.products;
        // console.log(req.body);

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let ord;
        let meta;

        try {
            [ordId, meta] = await db.query(
                'INSERT INTO orders (buyer_id, price, createdAt) VALUES (?, ?, ?)',
                {
                    replacements: [
                        buyerId,
                        price,
                        dateTime,
                    ],
                    type: QueryTypes.INSERT,
                    raw:true
            });

            if(meta != 0 && meta >= 1 && product_list.length > 0) {
                product_list.forEach(async element => {
                    const r = await db.query('INSERT INTO order_products (orderId, productId, seller_id, quantity, oneUnitPrice, totalPrice, createdAt, updatedAt, deletedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    {
                        replacements: [
                            ordId,
                            element.productId,
                            element.seller_id,
                            element.quantity,
                            element.oneUnitPrice,
                            element.totalPrice,
                            dateTime,
                            dateTime,
                            dateTime
                        ],
                        type: QueryTypes.INSERT,
                        raw: true
                    });                    
                });
            }
        }
        catch(error) {
            res.send({success:false, message: "Order cannot be saved!"});
            throw(error);
        }
        res.send({"success":true, "message": "Order has been saved successfully!", "id": ordId});
    }
};