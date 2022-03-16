const Product = require("./Product");
const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class ProductImage extends Model{

}

ProductImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "id",
            },
        },
        image: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize: db,
        modelName: "ProductImage",
        tableName: "product_images",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = ProductImage;