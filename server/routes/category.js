const { getAllCategory } = require("../controllers/categoryController");

const router = require("express").Router();

router.get("/", getAllCategory);

module.exports = router;
