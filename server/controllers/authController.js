const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ===========================================================
   Generate JWT Token
=========================================================== */

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
};

/* ===========================================================
   REGISTER USER
=========================================================== */

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    /* -----------------------------
       Validation
    ----------------------------- */

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    /* -----------------------------
       Existing User
    ----------------------------- */

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    /* -----------------------------
       Hash Password
    ----------------------------- */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* -----------------------------
       Validate Role
    ----------------------------- */

    const allowedRoles = ["Admin", "Manager", "Employee"];

    const userRole =
      role && allowedRoles.includes(role)
        ? role
        : "Employee";

    /* -----------------------------
       Create User
    ----------------------------- */

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: userRole,
    });

    /* -----------------------------
       Generate Token
    ----------------------------- */

    const token = generateToken(user._id);

    /* -----------------------------
       Remove Password
    ----------------------------- */

    const userData = user.toObject();
    delete userData.password;

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

/* ===========================================================
   LOGIN USER
=========================================================== */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* -----------------------------
       Validation
    ----------------------------- */

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    /* -----------------------------
       Find User
    ----------------------------- */

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /* -----------------------------
       Account Status
    ----------------------------- */

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been disabled.",
      });
    }

    /* -----------------------------
       Compare Password
    ----------------------------- */

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /* -----------------------------
       Generate Token
    ----------------------------- */

    const token = generateToken(user._id);

    /* -----------------------------
       Remove Password
    ----------------------------- */

    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};