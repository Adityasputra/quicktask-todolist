const router = require("express").Router();
const routerUser = require("./user");
const routerCategory = require("./category");

router.use("/api/users", routerUser);
router.use("/api/categories", routerCategory);

module.exports = router;
