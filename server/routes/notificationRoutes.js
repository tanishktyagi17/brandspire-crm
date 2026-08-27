const express = require("express");

const {
  createContactNotification,
  getNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

/* ===========================================================
   PUBLIC ROUTE
   Used by BrandSpire Portfolio
=========================================================== */

router.post(
  "/contact",
  createContactNotification
);

/* ===========================================================
   PROTECTED CRM ROUTES
=========================================================== */

router.get(
  "/",
  protect,
  getNotifications
);

router.get(
  "/unread-count",
  protect,
  getUnreadCount
);

router.put(
  "/read-all",
  protect,
  markAllNotificationsRead
);

router.put(
  "/:id/read",
  protect,
  markNotificationRead
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

module.exports = router;