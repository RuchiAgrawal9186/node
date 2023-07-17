const express = require("express")
const taskRouter = express.Router()
const {Task} = require("../models/task.model")

const {Board} = require("../models/board.model")
const {auth} = require("../middleware/auth.middleware")


// taskRouter.use(auth)

taskRouter.post('/tasks', async (req, res) => {
    try {
      const { boardId, title, description, status } = req.body;
      const task = await Task.create({
        title,
        description,
        status,
        subtasks: [],
      });
  
      const board = await Board.findByIdAndUpdate(
        boardId,
        { $push: { tasks: task._id } },
        { new: true }
      );
  
      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  taskRouter.patch('/tasks/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
      const task = await Task.findByIdAndUpdate(
        taskId,
        { status },
        { new: true }
      );
  
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  taskRouter.delete('/tasks/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
      await Task.findByIdAndDelete(taskId);
      return res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  


module.exports={
    taskRouter
}
