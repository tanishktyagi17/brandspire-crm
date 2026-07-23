const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

/* ===========================================================
   Route Imports
=========================================================== */

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");

/* ===========================================================
   Initialize App
=========================================================== */

const app = express();

/* ===========================================================
   Middleware
=========================================================== */

// Enable CORS
app.use(
  cors({
    origin: [
      "https://brandspire-crm.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// Parse URL Encoded Data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Parse Cookies
app.use(cookieParser());

/* ===========================================================
   API Routes
=========================================================== */

// Authentication Routes
app.use("/api/auth", authRoutes);

// Customer Routes
app.use("/api/customers", customerRoutes);

/* ===========================================================
   Health Check Route
=========================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Brandspire CRM Backend is running successfully 🚀",
  });
});

/* ===========================================================
   404 Handler
=========================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

module.exports = app;