const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db");

module.exports = sequelize.define("Variant", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  optionValues: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "{}",
    validate: {
      isValidJson(value) {
        try { JSON.parse(value); } catch { throw new Error("optionValues must be valid JSON"); }
      }
    }
  }
});