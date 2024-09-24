const { register, login } = require("../controllers/userController");

const router = require("express").Router();

router.use("/register", register);
router.use("/login", login)

module.exports = router;
