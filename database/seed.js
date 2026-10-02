const { sequelize } = require("./db");
const { Category, Product, Variant, SKU } = require("../src/models");

async function seed() {
  await sequelize.sync({ force: true });

  const electronics = await Category.create({
    name: "Electronics", slug: "electronics", active: true
  });
  const phones = await Category.create({
    name: "Phones", slug: "phones", parentId: electronics.id, active: true
  });

  const phone = await Product.create({
    categoryId: phones.id,
    name: "Demo Smartphone",
    slug: "demo-smartphone",
    description: "Representative Sprint 2 product.",
    status: "published"
  });

  const laptop = await Product.create({
    categoryId: electronics.id,
    name: "Demo Laptop",
    slug: "demo-laptop",
    description: "Representative laptop.",
    status: "draft"
  });

  const headphones = await Product.create({
    categoryId: electronics.id,
    name: "Demo Headphones",
    slug: "demo-headphones",
    description: "Representative headphones.",
    status: "draft"
  });

  const black128 = await Variant.create({
    productId: phone.id,
    optionValues: JSON.stringify({ color: "black", storage: "128GB" })
  });
  const blue256 = await Variant.create({
    productId: phone.id,
    optionValues: JSON.stringify({ color: "blue", storage: "256GB" })
  });
  const laptopVariant = await Variant.create({
    productId: laptop.id,
    optionValues: JSON.stringify({ ram: "16GB", storage: "512GB" })
  });
  const headphonesVariant = await Variant.create({
    productId: headphones.id,
    optionValues: JSON.stringify({ color: "black" })
  });

  await SKU.bulkCreate([
    { variantId: black128.id, code: "PHONE-BLK-128", price: 499.99, stockQuantity: 10, active: true },
    { variantId: blue256.id, code: "PHONE-BLU-256", price: 599.99, stockQuantity: 5, active: true },
    { variantId: laptopVariant.id, code: "LAPTOP-16-512", price: 899.99, stockQuantity: 7, active: true },
    { variantId: headphonesVariant.id, code: "HEAD-BLK-01", price: 79.99, stockQuantity: 0, active: false }
  ]);

  console.log("Seed completed: 2 categories, 3 products, 4 SKUs.");
  await sequelize.close();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});