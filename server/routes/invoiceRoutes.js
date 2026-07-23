const express = require("express");

const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoiceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* ===========================================================
   ALL ROUTES REQUIRE LOGIN
=========================================================== */

router.use(protect);

/* ===========================================================
   CRUD ROUTES
=========================================================== */

// Get all invoices
router.get("/", getInvoices);

// Get invoice by ID
router.get("/:id", getInvoiceById);

// Create invoice
router.post("/", createInvoice);

// Update invoice
router.put("/:id", updateInvoice);

// Delete invoice
router.delete("/:id", deleteInvoice);

module.exports = router;