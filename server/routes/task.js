const {
  createTask,
  getAllTask,
  updateTask,
  getAllUserTask,
  deleteTask,
} = require("../controllers/taskController");
const { auth, authoriz } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createTask);
router.get("/", auth, getAllUserTask);
router.put("/:id/update", auth, authoriz, updateTask);
router.delete("/:id/delete", auth, authoriz, deleteTask);

module.exports = router;
