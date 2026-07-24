const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

/* ===========================================================
   Route Imports
=========================================================== */

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const leadRoutes = require("./routes/leadRoutes");
const taskRoutes = require("./routes/taskRoutes");
const companyRoutes = require("./routes/companyRoutes");

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

// Parse JSON (Increased limit for logo & signature uploads)
app.use(
  express.json({
    limit: "10mb",
  })
);

// Parse URL Encoded Data (Increased limit)
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// Parse Cookies
app.use(cookieParser());

/* ===========================================================
   API Routes
=========================================================== */

// Authentication
app.use("/api/auth", authRoutes);

// CRM Modules
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/company", companyRoutes);

/* ===========================================================
   Health Check
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

/* ===========================================================
   Global Error Handler
=========================================================== */

app.use((err, req, res, next) => {
  console.error(err);

  if (err.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message:
        "Uploaded file is too large. Please use a smaller image.",
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;