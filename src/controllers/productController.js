const { Product, Category, Variant, SKU } = require("../models");

async function create(req, res) {
  try {
    const { name, slug, description = null, status = "draft", categoryId } = req.body;
    if (!name || !slug || !categoryId)
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "name, slug and categoryId are required." });

    if (!await Category.findByPk(categoryId))
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Category not found." });

    const product = await Product.create({ name, slug, description, status, categoryId });
    res.status(201).json(product);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError")
      return res.status(409).json({ error: "DUPLICATE_SLUG", message: "Product slug already exists." });
    res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
}

async function update(req, res) {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "NOT_FOUND" });
  await product.update(req.body);
  res.json(product);
}

async function list(req, res) {
  const products = await Product.findAll({
    include: [{ model: Variant, include: [SKU] }, Category]
  });
  res.json(products);
}

module.exports = { create, update, list };