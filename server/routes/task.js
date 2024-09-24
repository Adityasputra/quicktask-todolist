const {
  createTask,
  getAllTask,
  updateTask,
  getAllUserTask,
} = require("../controllers/taskController");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createTask);
router.get("/", auth, getAllUserTask);
router.put("/:id/update",auth, updateTask);

module.exports = router;
