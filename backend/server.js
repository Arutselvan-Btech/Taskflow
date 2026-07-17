const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

console.log(process.env.MONGO_URI);

// Database Connection
const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/auth");
console.log(authRoutes);

const taskRoutes = require("./routes/tasks");
console.log(taskRoutes);

console.log("Auth Routes:", authRoutes);
console.log("Task Routes:", taskRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Todo API is Running...");
});

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is running successfully",
    });
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});