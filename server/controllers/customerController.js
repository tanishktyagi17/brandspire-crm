const Customer = require("../models/Customer");

/* ===========================================================
   GET ALL CUSTOMERS
=========================================================== */

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    console.error("Get Customers Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customers.",
    });
  }
};

/* ===========================================================
   GET SINGLE CUSTOMER
=========================================================== */

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    console.error("Get Customer Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customer.",
    });
  }
};

/* ===========================================================
   CREATE CUSTOMER
=========================================================== */

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully.",
      customer,
    });
  } catch (error) {
    console.error("Create Customer Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create customer.",
    });
  }
};

/* ===========================================================
   UPDATE CUSTOMER
=========================================================== */

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      customer,
    });
  } catch (error) {
    console.error("Update Customer Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update customer.",
    });
  }
};

/* ===========================================================
   DELETE CUSTOMER
=========================================================== */

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Customer Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete customer.",
    });
  }
};