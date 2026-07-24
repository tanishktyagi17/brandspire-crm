const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    gstin: {
      type: String,
      default: "",
    },

    pan: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    currency: {
      type: String,
      default: "INR",
    },

    invoicePrefix: {
      type: String,
      default: "INV",
    },

    defaultGST: {
      type: Number,
      default: 18,
    },

    paymentTerms: {
      type: String,
      default: "Due on Receipt",
    },

    bankName: {
      type: String,
      default: "",
    },

    accountName: {
      type: String,
      default: "",
    },

    accountNumber: {
      type: String,
      default: "",
    },

    ifsc: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    upi: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    signature: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);