const router = require("express").Router();
const { requireAdmin } = require("../middleware/auth");
const controller = require("../controllers/categoryController");

router.use(requireAdmin);
router.post("/", controller.create);
router.get("/", controller.list);
router.patch("/:id", controller.update);

module.exports = router;