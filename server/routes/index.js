const router = require("express").Router();
const routerUser = require("./user");
const routerTask = require("./task");

router.use("/api/users", routerUser);
router.use("/api/tasks", routerTask);

module.exports = router;
