const { Sequelize } = require("sequelize");

const env = process.env;

const DB_HOST = env.DB_HOST;
const DB_NAME = env.MYSQL_DATABASE;
const DB_USER = env.MYSQL_USER;
const DB_PASS = env.MYSQL_PASSWORD;
const DB_PORT = env.MYSQL_PORT;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql"
});
