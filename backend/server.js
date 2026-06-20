require("dotenv").config();

const express = require("express");
const cors = require("cors");
const colors = require("colors");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();


// =====================
// DATABASE CONNECTION
// =====================
connectDB();


// =====================
// MIDDLEWARES
// =====================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// =====================
// ROUTES
// =====================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Mini Project Management Portal API Running",
  });
});

app.use("/api/tasks", taskRoutes);


// =====================
// ERROR HANDLER
// =====================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


// =====================
// SERVER START
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`.yellow?.bold ||
      `Server running on port ${PORT}`
  );
});