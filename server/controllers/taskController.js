const { Task } = require("../models");

module.exports = class TaskController {
  static async createTask(req, res) {
    try {
      const { title, description } = req.body;
      const { userId } = req.user;
      const newTask = await Task.create({
        title,
        description,
        status: "pending",
        UserId: userId,
      });

      res.status(201).json(newTask);
    } catch (error) {
      // console.log(error);
      if (error.name === "SequelizeValidationError") {
        const validate = error.errors.map((er) => er.message);
        res.status(400).json({
          message: validate,
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  // static async getAllTask(req, res) {
  //   try {
  //     const tasks = await Task.findAll();
  //     res.status(200).json(tasks);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Internal Server Error",
  //     });
  //   }
  // }

  static async updateTask(req, res) {
    try {
      const { title, description, status } = req.body;
      const { id } = req.params;
      const updateTask = await Task.findByPk(id);
      if (!updateTask) {
        return res.status(404).json({
          message: "Task Not Found",
        });
      } else {
        await Task.update(
          {
            title,
            description,
            status,
          },
          {
            where: {
              id,
            },
          }
        );

        res.status(200).json({
          message: "Successfully update the task",
        });
      }
    } catch (error) {
      // console.log(error);
      if (error.name === "SequelizeValidationError") {
        const validate = error.errors.map((er) => er.message);
        res.status(400).json({
          message: validate,
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async getAllUserTask(req, res) {
    try {
      const { userId } = req.user;
      const tasks = await Task.findAll({ where: { UserId: userId } });
      if (!tasks) {
        return res.status(404).json({
          message: "Task User is Not Found",
        });
      }
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({
          message: "Task Not Found",
        });
      } else {
        await Task.destroy({ where: { id } });
        res.status(200).json({
          message: "Successfully delete the task",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};
