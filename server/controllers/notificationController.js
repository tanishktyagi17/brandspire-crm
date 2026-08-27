const Notification = require("../models/Notification");

/* ===========================================================
   CREATE CONTACT NOTIFICATION
   PUBLIC - USED BY PORTFOLIO
=========================================================== */

exports.createContactNotification = async (req, res) => {
  try {
    const {
      name,
      email,
      projectDetails,
      message,
      source,
    } = req.body;

    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "")
      .trim()
      .toLowerCase();

    const cleanProjectDetails = String(
      projectDetails || message || ""
    ).trim();

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!cleanEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!cleanProjectDetails) {
      return res.status(400).json({
        success: false,
        message: "Project details are required.",
      });
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const notification =
      await Notification.create({
        type: "CONTACT",

        title: "New Portfolio Enquiry",

        message: `${cleanName} sent a new project enquiry.`,

        name: cleanName,

        email: cleanEmail,

        projectDetails:
          cleanProjectDetails,

        source:
          String(
            source ||
              "BrandSpire Portfolio"
          ).trim(),

        isRead: false,
      });

    return res.status(201).json({
      success: true,
      message:
        "Notification created successfully.",
      notification,
    });
  } catch (error) {
    console.error(
      "Create Contact Notification Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create notification.",
    });
  }
};

/* ===========================================================
   GET ALL NOTIFICATIONS
   PROTECTED - CRM ONLY
=========================================================== */

exports.getNotifications = async (req, res) => {
  try {
    const notifications =
      await Notification.find()
        .sort({
          createdAt: -1,
        })
        .limit(100);

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error(
      "Get Notifications Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch notifications.",
    });
  }
};

/* ===========================================================
   GET UNREAD COUNT
   PROTECTED - CRM ONLY
=========================================================== */

exports.getUnreadCount = async (req, res) => {
  try {
    const count =
      await Notification.countDocuments({
        isRead: false,
      });

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error(
      "Get Unread Notification Count Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch unread notification count.",
    });
  }
};

/* ===========================================================
   MARK SINGLE NOTIFICATION AS READ
   PROTECTED - CRM ONLY
=========================================================== */

exports.markNotificationRead = async (
  req,
  res
) => {
  try {
    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          isRead: true,
        },
        {
          new: true,
        }
      );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message:
          "Notification not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Notification marked as read.",
      notification,
    });
  } catch (error) {
    console.error(
      "Mark Notification Read Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update notification.",
    });
  }
};

/* ===========================================================
   MARK ALL NOTIFICATIONS AS READ
   PROTECTED - CRM ONLY
=========================================================== */

exports.markAllNotificationsRead = async (
  req,
  res
) => {
  try {
    await Notification.updateMany(
      {
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "All notifications marked as read.",
    });
  } catch (error) {
    console.error(
      "Mark All Notifications Read Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update notifications.",
    });
  }
};

/* ===========================================================
   DELETE NOTIFICATION
   PROTECTED - CRM ONLY
=========================================================== */

exports.deleteNotification = async (
  req,
  res
) => {
  try {
    const notification =
      await Notification.findByIdAndDelete(
        req.params.id
      );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message:
          "Notification not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Notification deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Notification Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete notification.",
    });
  }
};