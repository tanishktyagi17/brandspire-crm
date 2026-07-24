const express = require("express");

const {
  getCompany,
  updateCompany,
} = require("../controllers/companyController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* ===========================================================
   Company Routes
=========================================================== */

// Get Company Settings
router.get("/", protect, getCompany);

// Update Company Settings
router.put("/", protect, updateCompany);

module.exports = router;