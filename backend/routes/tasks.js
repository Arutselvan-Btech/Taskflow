const express = require("express");
const router = express.Router();

const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    getTaskStats
} = require("../controllers/taskController");

const { protect } = require("../middleware/auth");

// All routes are protected
router.use(protect);

// Dashboard Stats
router.get("/stats", getTaskStats);

// Get All Tasks
router.get("/", getTasks);

// Get Single Task
router.get("/:id", getTask);

// Create Task
router.post("/", createTask);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

module.exports = router;