const express = require("express");

const {
  register,
  login,
  sendOtp,
  verifyOtp,
} = require("../controllers/authController");


const router = express.Router();


/* ===========================================================
   AUTH ROUTES
=========================================================== */


// Send Email OTP
router.post(
  "/send-otp",
  sendOtp
);


// Verify Email OTP
router.post(
  "/verify-otp",
  verifyOtp
);


// Register User
router.post(
  "/register",
  register
);


// Login User
router.post(
  "/login",
  login
);


module.exports = router;