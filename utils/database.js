const { Sequelize } = require("sequelize");
const DB = "Todo";
const UserName = "root";
const UserPassword = "admin123456";
const sequelize = new Sequelize(DB, UserName, UserPassword, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
