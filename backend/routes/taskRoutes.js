const express = require("express");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getStats,
} = require("../controllers/taskController");

const router = express.Router();


// Dashboard Statistics
router.get("/stats", getStats);


// Task CRUD
router.get("/", getTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;