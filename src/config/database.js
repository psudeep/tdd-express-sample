const Sequelize = require("sequelize");
const config = require("config");

const dbConfig = config.get("database");

const sequelize = new Sequelize(
  dbConfig.dbname,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: dbConfig.logging,
  }
);

module.exports = sequelize;
