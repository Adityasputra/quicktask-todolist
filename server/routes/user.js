const { register, login, googleLogin } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);

module.exports = router;
