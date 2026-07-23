const Invoice = require("../models/Invoice");

/* ===========================================================
   CREATE INVOICE
=========================================================== */

exports.createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create({
      ...req.body,
      user: req.user._id,
    });

    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate("customer");

    res.status(201).json({
      success: true,
      message: "Invoice created successfully.",
      invoice: populatedInvoice,
    });
  } catch (error) {
    console.error("Create Invoice Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create invoice.",
    });
  }
};

/* ===========================================================
   GET ALL INVOICES
=========================================================== */

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      user: req.user._id,
    })
      .populate("customer")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      invoices,
    });
  } catch (error) {
    console.error("Get Invoices Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch invoices.",
    });
  }
};

/* ===========================================================
   GET SINGLE INVOICE
=========================================================== */

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("customer");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    console.error("Get Invoice Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch invoice.",
    });
  }
};

/* ===========================================================
   UPDATE INVOICE
=========================================================== */

exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("customer");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully.",
      invoice,
    });
  } catch (error) {
    console.error("Update Invoice Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update invoice.",
    });
  }
};

/* ===========================================================
   DELETE INVOICE
=========================================================== */

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Invoice Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete invoice.",
    });
  }
};