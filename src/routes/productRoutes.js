const router = require("express").Router();
const { requireAdmin } = require("../middleware/auth");
const product = require("../controllers/productController");
const sku = require("../controllers/skuController");

router.use(requireAdmin);
router.post("/", product.create);
router.get("/", product.list);
router.patch("/:id", product.update);
router.post("/:id/skus", async (req, res, next) => {
  req.body.variantId = req.body.variantId;
  return sku.create(req, res, next);
});

module.exports = router;