const express = require("express")
const subtaskRouter = express.Router()
const {Subtask} = require("../models/subtask.model")
const {Task} = require("../models/task.model")

const {Board} = require("../models/board.model")
const {auth} = require("../middleware/auth.middleware")


// subtaskRouter.use(auth)

subtaskRouter.post('/subtasks', async (req, res) => {
    try {
      const { taskId, title } = req.body;
      const subtask = await Subtask.create({ title, isCompleted: false });
  
      const task = await Task.findByIdAndUpdate(
        taskId,
        { $push: { subtasks: subtask._id } },
        { new: true }
      );
  
      return res.status(201).json(subtask);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  subtaskRouter.patch('/subtasks/:subtaskId', async (req, res) => {
    try {
      const { subtaskId } = req.params;
      const { isCompleted } = req.body;
      const subtask = await Subtask.findByIdAndUpdate(
        subtaskId,
        { isCompleted },
        { new: true }
      );
  
      return res.status(200).json(subtask);
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  });


module.exports={
    subtaskRouter
}
