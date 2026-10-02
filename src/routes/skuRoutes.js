const router = require("express").Router();
const { requireAdmin } = require("../middleware/auth");
const controller = require("../controllers/skuController");

router.use(requireAdmin);
router.patch("/:id", controller.update);

module.exports = router;