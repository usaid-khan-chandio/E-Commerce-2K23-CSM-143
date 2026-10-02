const { SKU, Variant } = require("../models");

async function create(req, res) {
  try {
    const { code, price, stockQuantity = 0, active = true, variantId } = req.body;
    if (!code || price === undefined || !variantId)
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "code, price and variantId are required." });
    if (Number(price) < 0 || Number(stockQuantity) < 0)
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Price and stock cannot be negative." });
    if (!await Variant.findByPk(variantId))
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Variant not found." });

    const sku = await SKU.create({ code, price, stockQuantity, active, variantId });
    res.status(201).json(sku);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError")
      return res.status(409).json({ error: "DUPLICATE_SKU", message: "SKU code already exists." });
    res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
}

async function update(req, res) {
  try {
    const sku = await SKU.findByPk(req.params.id);
    if (!sku) return res.status(404).json({ error: "NOT_FOUND" });
    const { price, stockQuantity, active } = req.body;
    if (price !== undefined && Number(price) < 0)
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Price cannot be negative." });
    if (stockQuantity !== undefined && Number(stockQuantity) < 0)
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Stock cannot be negative." });
    await sku.update({ price, stockQuantity, active });
    res.json(sku);
  } catch (err) {
    res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
}

module.exports = { create, update };