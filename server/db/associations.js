const Product = require("./model/Product");
const ProductImage = require("./model/ProductImage");
const User = require("./model/User");
const Review = require("./model/Review");

User.hasMany(Product,{
    foreignKey: "seller_id",
});
Product.belongsTo(User,{
    foreignKey: "seller_id",
});
Product.hasMany(ProductImage,{
    //as: "productImage",
    foreignKey: "product_id",
});

ProductImage.belongsTo(Product,{
    foreignKey: "id",
});

/*
Product.hasMany(Review, {
    foreignKey: "courseId",
});
Review.belongsTo(Product, {
    foreignKey: "productId",
});
User.hasMany(Review, {
    as: "posted_reviews",
    foreignKey: "buyerId",
});
User.hasMany(Review, {
    as: "received_reviews",
    foreignKey: "sellerId",
});
Review.belongsTo(User, { as: "buyer" });
Review.belongsTo(User, { as: "seller" });
*/