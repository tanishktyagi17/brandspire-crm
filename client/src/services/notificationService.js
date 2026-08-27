import api from "./api";

/* ===========================================================
   GET ALL NOTIFICATIONS
=========================================================== */

export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

/* ===========================================================
   GET UNREAD COUNT
=========================================================== */

export const getUnreadNotificationCount = async () => {
  const { data } = await api.get(
    "/notifications/unread-count"
  );

  return data;
};

/* ===========================================================
   MARK SINGLE NOTIFICATION AS READ
=========================================================== */

export const markNotificationRead = async (id) => {
  const { data } = await api.put(
    `/notifications/${id}/read`
  );

  return data;
};

/* ===========================================================
   MARK ALL NOTIFICATIONS AS READ
=========================================================== */

export const markAllNotificationsRead = async () => {
  const { data } = await api.put(
    "/notifications/read-all"
  );

  return data;
};

/* ===========================================================
   DELETE NOTIFICATION
=========================================================== */

export const deleteNotification = async (id) => {
  const { data } = await api.delete(
    `/notifications/${id}`
  );

  return data;
};