const Task = require("../models/Task");

// ================================
// GET ALL TASKS
// Supports:
// - Search
// - Status Filter
// - Pagination
// - Sorting
// ================================
const getTasks = async (req, res) => {
  try {
    const {
      status,
      search = "",
      page = 1,
      limit = 5,
      sort = "newest",
    } = req.query;

    let query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const currentPage = parseInt(page);
    const pageSize = parseInt(limit);

    const totalTasks = await Task.countDocuments(query);

    let sortOption = { created_at: -1 };

    if (sort === "oldest") {
      sortOption = { created_at: 1 };
    }

    if (sort === "pending") {
      sortOption = { status: 1 };
    }

    if (sort === "completed") {
      sortOption = { status: -1 };
    }

    const tasks = await Task.find(query)
      .sort(sortOption)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      tasks,
      pagination: {
        currentPage,
        pageSize,
        totalTasks,
        totalPages: Math.ceil(totalTasks / pageSize),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

// ================================
// CREATE TASK
// ================================
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    if (!description || description.length < 20) {
      return res.status(400).json({
        success: false,
        message: "Description must be at least 20 characters",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// ================================
// UPDATE TASK STATUS
// ================================
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "In Progress",
      "Completed",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};

// ================================
// DELETE TASK
// ================================
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

// ================================
// DASHBOARD STATISTICS
// ================================
const getStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalTasks,
        pendingTasks,
        completedTasks,
        inProgressTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getStats,
};