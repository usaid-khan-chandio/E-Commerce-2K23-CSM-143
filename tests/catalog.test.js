const test = require("node:test");
const assert = require("node:assert/strict");
const { sequelize } = require("../database/db");
const { Category, Product, Variant, SKU } = require("../src/models");

test.before(async () => {
  await sequelize.sync({ force: true });
});

test.after(async () => {
  await sequelize.close();
});

test("creates category and prevents duplicate slug", async () => {
  await Category.create({ name: "Electronics", slug: "electronics" });
  await assert.rejects(
    Category.create({ name: "Other", slug: "electronics" }),
    /Validation error/
  );
});

test("creates product with required fields", async () => {
  const category = await Category.findOne({ where: { slug: "electronics" } });
  const product = await Product.create({
    name: "Test Phone",
    slug: "test-phone",
    categoryId: category.id,
    status: "draft"
  });
  assert.equal(product.slug, "test-phone");
});

test("rejects negative stock", async () => {
  const product = await Product.findOne({ where: { slug: "test-phone" } });
  const variant = await Variant.create({
    productId: product.id,
    optionValues: JSON.stringify({ color: "black" })
  });
  await assert.rejects(
    SKU.create({
      variantId: variant.id,
      code: "NEGATIVE-STOCK",
      price: 10,
      stockQuantity: -1
    }),
    /Validation error/
  );
});

test("rejects duplicate SKU code", async () => {
  const product = await Product.findOne({ where: { slug: "test-phone" } });
  const variant = await Variant.findOne({ where: { productId: product.id } });
  await SKU.create({
    variantId: variant.id,
    code: "UNIQUE-SKU",
    price: 10,
    stockQuantity: 1
  });
  await assert.rejects(
    SKU.create({
      variantId: variant.id,
      code: "UNIQUE-SKU",
      price: 20,
      stockQuantity: 1
    }),
    /Validation error/
  );
});