const { register } = require("../controllers/userController");

const router = require("express").Router();

router.use("/register", register);

module.exports = router;
