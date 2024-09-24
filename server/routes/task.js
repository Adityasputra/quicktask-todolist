const {
  createTask,
  getAllTask,
  updateTask,
} = require("../controllers/taskController");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createTask);
router.get("/", auth, getAllTask);
router.put("/:id/update", updateTask);

module.exports = router;
