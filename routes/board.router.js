const express = require("express")
const boardRouter = express.Router()
const {Board} = require("../models/board.model")
const {auth} = require("../middleware/auth.middleware")


// boardRouter.use(auth)

boardRouter.post('/boards', async (req, res) => {
    try {
      const { name } = req.body;
      const board = await Board.create({ name });
      return res.status(201).json(board);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  boardRouter.get('/', async (req, res) => {
    try {
      const boards = await Board.find().populate('tasks');
      return res.status(200).json(boards);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  


module.exports={
    boardRouter
}
