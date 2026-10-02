const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DATABASE_URL || "./database/catalog.sqlite",
  logging: false
});

module.exports = { sequelize };