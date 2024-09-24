const { createTask } = require("../controllers/taskController");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createTask);

module.exports = router;
