const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db");

module.exports = sequelize.define("SKU", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  variantId: { type: DataTypes.INTEGER, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: { min: 0 }
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 }
  },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
});