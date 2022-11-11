const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "username", "password", {
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

module.exports = sequelize;
