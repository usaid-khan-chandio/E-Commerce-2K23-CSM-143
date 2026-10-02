const { Category } = require("../models");

async function create(req, res) {
  try {
    const { name, slug, parentId = null } = req.body;
    if (!name || !slug) return res.status(400).json({ error: "VALIDATION_ERROR", message: "name and slug are required." });

    if (parentId !== null) {
      const parent = await Category.findByPk(parentId);
      if (!parent) return res.status(400).json({ error: "VALIDATION_ERROR", message: "Parent category not found." });
    }

    const category = await Category.create({ name, slug, parentId });
    res.status(201).json(category);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError")
      return res.status(409).json({ error: "DUPLICATE_SLUG", message: "Category slug already exists." });
    res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
}

async function list(req, res) {
  const categories = await Category.findAll({ order: [["id", "ASC"]] });
  res.json(categories);
}

async function update(req, res) {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: "NOT_FOUND" });

  const { name, slug, active, parentId } = req.body;
  if (parentId !== undefined && parentId !== null) {
    if (Number(parentId) === category.id)
      return res.status(400).json({ error: "CATEGORY_CYCLE", message: "A category cannot be its own parent." });
    const parent = await Category.findByPk(parentId);
    if (!parent) return res.status(400).json({ error: "VALIDATION_ERROR", message: "Parent category not found." });
  }
  await category.update({ name, slug, active, parentId });
  res.json(category);
}

module.exports = { create, list, update };