const db = require("../db");
const { DataTypes, Model } = require("sequelize");
const Product = require("./Product");


class FeaturedProducts extends Model {}

FeaturedProducts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "id"
            }
        },
        featured_title: {
            type: DataTypes.STRING
        },
        featured_image: {
            type: DataTypes.TEXT
        },
        featured_desc: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize: db,
        modelName: "FeaturedProducts",
        tableName: "featured_products",
        paranoid: true
    }
);

module.exports = FeaturedProducts;