const { Task } = require("../models");

module.exports = class TaskController {
  static async createTask(req, res) {
    try {
      const { title, description } = req.body;
      const { id } = req.user;
      console.log(req.user, "<<< This req user");
      const newTask = await Task.create({
        title,
        description,
        status: "pending",
        UserId: id,
      });

      res.status(201).json(newTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};
