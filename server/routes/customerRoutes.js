const express = require("express");

const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* ===========================================================
   CUSTOMER ROUTES
=========================================================== */

// Get All Customers
router.get("/", protect, getCustomers);

// Get Single Customer
router.get("/:id", protect, getCustomer);

// Create Customer
router.post("/", protect, createCustomer);

// Update Customer
router.put("/:id", protect, updateCustomer);

// Delete Customer
router.delete("/:id", protect, deleteCustomer);

module.exports = router;