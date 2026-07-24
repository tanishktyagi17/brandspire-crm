const express = require("express");

const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* ===========================================================
   ALL ROUTES REQUIRE LOGIN
=========================================================== */

router.use(protect);

/* ===========================================================
   CRUD ROUTES
=========================================================== */

// Get all leads
router.get("/", getLeads);

// Get single lead
router.get("/:id", getLead);

// Create lead
router.post("/", createLead);

// Update lead
router.put("/:id", updateLead);

// Delete lead
router.delete("/:id", deleteLead);

module.exports = router;