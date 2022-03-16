const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class User extends Model {
    static get GENDER() {
        return {
            get MALE() {
                return 0;
            },
            get FEMALE() {
                return 1;
            },
            get DIVERSE() {
                return 2;
            },
        };
    }
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
        },
        gender: {
            type: DataTypes.BOOLEAN,
        },
        isBuyer: {
            type: DataTypes.BOOLEAN,
        },
        isSeller: {
            type: DataTypes.BOOLEAN,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
        profile_image: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: db,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = User;
