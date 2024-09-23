const router = require("express").Router();
const routerUser = require("./user");

router.use("/api/users", routerUser);

module.exports = router;
