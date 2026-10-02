const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db");

module.exports = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  categoryId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM("draft", "published", "archived"),
    allowNull: false,
    defaultValue: "draft"
  }
});