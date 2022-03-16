const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const User = require("./User");
const Product = require("./Product");

class Review extends Model {}

Review.init(
    {
        buyerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "id",
            },
        },
        rating: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        ratingComments: {
            type: DataTypes.TEXT,
        },
        reportReview: {
            type: DataTypes.TINYINT,
        },
        reportReviewComments: {
            type: DataTypes.TEXT,
        },
        reportReviewStatus: {
            type: DataTypes.TINYINT,
        },
    },
    {
        sequelize: db,
        modelName: "Review",
        tableName: "reviews",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Review;
