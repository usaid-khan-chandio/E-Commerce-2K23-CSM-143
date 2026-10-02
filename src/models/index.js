const Category = require("./Category");
const Product = require("./Product");
const Variant = require("./Variant");
const SKU = require("./SKU");

Category.hasMany(Category, { as: "children", foreignKey: "parentId" });
Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

Product.hasMany(Variant, { foreignKey: "productId", onDelete: "CASCADE" });
Variant.belongsTo(Product, { foreignKey: "productId" });

Variant.hasMany(SKU, { foreignKey: "variantId", onDelete: "CASCADE" });
SKU.belongsTo(Variant, { foreignKey: "variantId" });

module.exports = { Category, Product, Variant, SKU };