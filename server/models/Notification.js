const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["CONTACT", "SYSTEM"],
      default: "CONTACT",
    },

    title: {
      type: String,
      default: "New Portfolio Enquiry",
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    projectDetails: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      default: "BrandSpire Portfolio",
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);