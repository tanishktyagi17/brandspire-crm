import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { createPortal } from "react-dom";

import {
  Bell,
  CheckCheck,
  Mail,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";

import { toast } from "sonner";

import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../../services/notificationService";

export default function NotificationBell() {
  const [open, setOpen] =
    useState(false);

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  const [loading, setLoading] =
    useState(false);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  /* ===========================================================
     LOAD UNREAD COUNT
  =========================================================== */

  const loadUnreadCount =
    useCallback(async () => {
      try {
        const data =
          await getUnreadNotificationCount();

        setUnreadCount(
          Number(data?.count || 0)
        );
      } catch (error) {
        console.error(
          "Unread Notification Error:",
          error
        );
      }
    }, []);

  /* ===========================================================
     LOAD NOTIFICATIONS
  =========================================================== */

  const loadNotifications =
    useCallback(
      async (
        showLoader = true
      ) => {
        try {
          if (showLoader) {
            setLoading(true);
          }

          const data =
            await getNotifications();

          setNotifications(
            data?.notifications || []
          );
        } catch (error) {
          console.error(
            "Notification Load Error:",
            error
          );

          toast.error(
            error.response?.data
              ?.message ||
              "Failed to load notifications."
          );
        } finally {
          if (showLoader) {
            setLoading(false);
          }
        }
      },
      []
    );

  /* ===========================================================
     INITIAL LOAD
  =========================================================== */

  useEffect(() => {
    loadUnreadCount();
  }, [loadUnreadCount]);

  /* ===========================================================
     POLLING
  =========================================================== */

  useEffect(() => {
    const interval =
      window.setInterval(
        async () => {
          await loadUnreadCount();

          if (open) {
            await loadNotifications(
              false
            );
          }
        },
        30000
      );

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [
    open,
    loadUnreadCount,
    loadNotifications,
  ]);

  /* ===========================================================
     LOCK BODY SCROLL WHILE OPEN
     USEFUL ON ANDROID
  =========================================================== */

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  /* ===========================================================
     OPEN BELL
  =========================================================== */

  const handleOpen =
    async () => {
      setOpen(true);

      await Promise.all([
        loadNotifications(),
        loadUnreadCount(),
      ]);
    };

  /* ===========================================================
     TOGGLE
  =========================================================== */

  const handleToggle = async (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (open) {
      setOpen(false);
      return;
    }

    await handleOpen();
  };

  /* ===========================================================
     MANUAL REFRESH
  =========================================================== */

  const handleRefresh =
    async () => {
      try {
        setRefreshing(true);

        await Promise.all([
          loadNotifications(false),
          loadUnreadCount(),
        ]);
      } finally {
        setRefreshing(false);
      }
    };

  /* ===========================================================
     MARK SINGLE READ
  =========================================================== */

  const handleNotificationClick =
    async (notification) => {
      if (
        notification.isRead
      ) {
        return;
      }

      try {
        await markNotificationRead(
          notification._id
        );

        setNotifications(
          (previous) =>
            previous.map(
              (item) =>
                item._id ===
                notification._id
                  ? {
                      ...item,
                      isRead: true,
                    }
                  : item
            )
        );

        setUnreadCount(
          (previous) =>
            Math.max(
              0,
              previous - 1
            )
        );
      } catch (error) {
        console.error(
          "Mark Notification Read Error:",
          error
        );

        toast.error(
          "Failed to mark notification as read."
        );
      }
    };

  /* ===========================================================
     MARK ALL READ
  =========================================================== */

  const handleMarkAllRead =
    async () => {
      try {
        await markAllNotificationsRead();

        setNotifications(
          (previous) =>
            previous.map(
              (item) => ({
                ...item,
                isRead: true,
              })
            )
        );

        setUnreadCount(0);

        toast.success(
          "All notifications marked as read."
        );
      } catch (error) {
        console.error(
          "Mark All Read Error:",
          error
        );

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update notifications."
        );
      }
    };

  /* ===========================================================
     DELETE
  =========================================================== */

  const handleDelete = async (
    notification
  ) => {
    try {
      await deleteNotification(
        notification._id
      );

      setNotifications(
        (previous) =>
          previous.filter(
            (item) =>
              item._id !==
              notification._id
          )
      );

      if (
        !notification.isRead
      ) {
        setUnreadCount(
          (previous) =>
            Math.max(
              0,
              previous - 1
            )
        );
      }

      toast.success(
        "Notification deleted."
      );
    } catch (error) {
      console.error(
        "Delete Notification Error:",
        error
      );

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to delete notification."
      );
    }
  };

  /* ===========================================================
     TIME FORMAT
  =========================================================== */

  const formatTime = (
    date
  ) => {
    if (!date) return "";

    const created =
      new Date(date);

    if (
      Number.isNaN(
        created.getTime()
      )
    ) {
      return "";
    }

    const now =
      new Date();

    const difference =
      now.getTime() -
      created.getTime();

    const minutes =
      Math.floor(
        difference /
          (1000 * 60)
      );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours =
      Math.floor(
        minutes / 60
      );

    if (hours < 24) {
      return `${hours} hr${
        hours === 1 ? "" : "s"
      } ago`;
    }

    const days =
      Math.floor(
        hours / 24
      );

    if (days < 7) {
      return `${days} day${
        days === 1 ? "" : "s"
      } ago`;
    }

    return created.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* ===========================================================
     NOTIFICATION PANEL
  =========================================================== */

  const notificationPanel =
    open &&
    createPortal(
      <div className="fixed inset-0 z-[9999]">

        {/* Backdrop */}

        <button
          type="button"
          aria-label="Close notifications"
          onClick={() =>
            setOpen(false)
          }
          className="absolute inset-0 h-full w-full cursor-default bg-slate-900/20 backdrop-blur-[1px]"
        />

        {/* Panel */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            flex
            max-h-[85vh]
            flex-col
            overflow-hidden
            rounded-t-3xl
            border
            border-slate-200
            bg-white
            shadow-2xl

            sm:bottom-auto
            sm:left-auto
            sm:right-5
            sm:top-20
            sm:max-h-[75vh]
            sm:w-[430px]
            sm:rounded-3xl
          "
          onClick={(event) =>
            event.stopPropagation()
          }
        >

          {/* Mobile Handle */}

          <div className="flex justify-center pb-1 pt-3 sm:hidden">
            <div className="h-1.5 w-12 rounded-full bg-slate-300" />
          </div>

          {/* Header */}

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">

            <div>

              <div className="flex items-center gap-2">

                <Bell
                  size={20}
                  className="text-blue-600"
                />

                <h3 className="text-lg font-bold text-slate-800">
                  Notifications
                </h3>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                {unreadCount ===
                0
                  ? "You're all caught up"
                  : `${unreadCount} unread notification${
                      unreadCount ===
                      1
                        ? ""
                        : "s"
                    }`}
              </p>

            </div>

            <div className="flex items-center gap-1">

              {/* Refresh */}

              <button
                type="button"
                onClick={
                  handleRefresh
                }
                disabled={
                  refreshing
                }
                title="Refresh"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition active:bg-slate-100 sm:hover:bg-slate-100"
              >
                <RefreshCw
                  size={18}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>

              {/* Mark All */}

              {unreadCount >
                0 && (
                <button
                  type="button"
                  onClick={
                    handleMarkAllRead
                  }
                  title="Mark all as read"
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-blue-600 transition active:bg-blue-50 sm:hover:bg-blue-50"
                >
                  <CheckCheck
                    size={19}
                  />
                </button>
              )}

              {/* Close */}

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                title="Close"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition active:bg-slate-100 sm:hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

          </div>

          {/* Content */}

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">

            {loading ? (
              <div className="flex min-h-[260px] flex-col items-center justify-center px-6 py-10">

                <RefreshCw
                  size={28}
                  className="animate-spin text-blue-600"
                />

                <p className="mt-4 text-sm text-slate-500">
                  Loading notifications...
                </p>

              </div>
            ) : notifications.length ===
              0 ? (
              <div className="flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">

                  <Bell
                    size={30}
                    className="text-slate-400"
                  />

                </div>

                <h4 className="mt-4 text-lg font-semibold text-slate-700">
                  No Notifications
                </h4>

                <p className="mt-2 max-w-[260px] text-sm leading-6 text-slate-500">
                  New enquiries from
                  the BrandSpire
                  portfolio will
                  appear here.
                </p>

              </div>
            ) : (
              <div>

                {notifications.map(
                  (
                    notification
                  ) => (
                    <div
                      key={
                        notification._id
                      }
                      className={`
                        border-b
                        border-slate-100
                        px-4
                        py-4
                        transition

                        ${
                          notification.isRead
                            ? "bg-white"
                            : "bg-blue-50/70"
                        }
                      `}
                    >

                      <div className="flex gap-3">

                        {/* Icon */}

                        <button
                          type="button"
                          onClick={() =>
                            handleNotificationClick(
                              notification
                            )
                          }
                          className={`
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl

                            ${
                              notification.isRead
                                ? "bg-slate-100 text-slate-500"
                                : "bg-blue-600 text-white"
                            }
                          `}
                        >
                          <Mail
                            size={18}
                          />
                        </button>

                        {/* Information */}

                        <button
                          type="button"
                          onClick={() =>
                            handleNotificationClick(
                              notification
                            )
                          }
                          className="min-w-0 flex-1 text-left"
                        >

                          <div className="flex items-start justify-between gap-2">

                            <div className="min-w-0">

                              <h4 className="font-semibold text-slate-800">
                                {notification.title ||
                                  "New Portfolio Enquiry"}
                              </h4>

                              <p className="mt-0.5 text-xs text-slate-400">
                                {formatTime(
                                  notification.createdAt
                                )}
                              </p>

                            </div>

                            {!notification.isRead && (
                              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                            )}

                          </div>

                          <div className="mt-3">

                            <p className="font-medium text-slate-700">
                              {notification.name ||
                                "Unknown"}
                            </p>

                            <p className="mt-1 break-all text-sm text-blue-600">
                              {notification.email ||
                                "-"}
                            </p>

                            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                              {notification.projectDetails ||
                                notification.message ||
                                "-"}
                            </p>

                          </div>

                          {!notification.isRead && (
                            <p className="mt-3 text-xs font-semibold text-blue-600">
                              Tap to mark
                              as read
                            </p>
                          )}

                        </button>

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              notification
                            )
                          }
                          title="Delete notification"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition active:bg-red-50 active:text-red-600 sm:hover:bg-red-50 sm:hover:text-red-600"
                        >
                          <Trash2
                            size={17}
                          />
                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

          {/* Mobile Footer */}

          <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:hidden">

            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white active:bg-slate-800"
            >
              Close
            </button>

          </div>

        </div>

      </div>,
      document.body
    );

  /* ===========================================================
     UI
  =========================================================== */

  return (
    <>
      <button
        type="button"
        onClick={
          handleToggle
        }
        className="
          relative
          z-40
          flex
          h-10
          w-10
          shrink-0
          touch-manipulation
          items-center
          justify-center
          rounded-full
          text-slate-700
          transition
          active:bg-slate-100
          sm:h-11
          sm:w-11
          sm:rounded-xl
          sm:border
          sm:border-slate-200
          sm:bg-white
          sm:shadow-sm
          sm:hover:bg-slate-50
          sm:hover:text-blue-600
        "
        aria-label="Open notifications"
        aria-expanded={open}
      >

        <Bell
          size={22}
        />

        {unreadCount > 0 && (
          <span
            className="
              pointer-events-none
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              leading-none
              text-white
              shadow
            "
          >
            {unreadCount >
            99
              ? "99+"
              : unreadCount}
          </span>
        )}

      </button>

      {notificationPanel}
    </>
  );
}