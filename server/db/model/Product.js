const User = require("./User");
const db = require("../db");
const { DataTypes, Model } = require("sequelize");

class Product extends Model {

}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        seller_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        title: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        imageUrl: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DECIMAL(4, 2),
        },
        posted_on: {
            type: DataTypes.TEXT,
        },
        category: {
            type: DataTypes.TEXT,
        },
        postcode: {
            type: DataTypes.INTEGER,
        },
        city: {
            type: DataTypes.TEXT,
        },
        street: {
            type: DataTypes.TEXT,
        },
        sellerName: {
            type: DataTypes.TEXT,
        },
        contact: {
            type: DataTypes.TEXT,
        },
        approve_status: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize: db,
        modelName: "Product",
        tableName: "products",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Product;
