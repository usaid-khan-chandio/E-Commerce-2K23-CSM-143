const express = require("express");
const { sequelize } = require("../database/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const skuRoutes = require("./routes/skuRoutes");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/v1/admin/categories", categoryRoutes);
app.use("/api/v1/admin/products", productRoutes);
app.use("/api/v1/admin/skus", skuRoutes);

async function start() {
  await sequelize.sync();
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

if (require.main === module) {
  start().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = app;