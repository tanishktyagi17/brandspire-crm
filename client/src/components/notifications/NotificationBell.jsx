import { useEffect, useRef, useState } from "react";

import {
  Bell,
  CheckCheck,
  Mail,
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
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const dropdownRef = useRef(null);

  /* ===========================================================
     LOAD UNREAD COUNT
  =========================================================== */

  const loadUnreadCount = async () => {
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
  };

  /* ===========================================================
     LOAD NOTIFICATIONS
  =========================================================== */

  const loadNotifications = async () => {
    try {
      setLoading(true);

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
        error.response?.data?.message ||
          "Failed to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
     INITIAL LOAD + POLLING
  =========================================================== */

  useEffect(() => {
    loadUnreadCount();

    const interval = setInterval(
      () => {
        loadUnreadCount();

        if (open) {
          loadNotifications();
        }
      },
      30000
    );

    return () =>
      clearInterval(interval);
  }, [open]);

  /* ===========================================================
     CLOSE WHEN CLICKING OUTSIDE
  =========================================================== */

  useEffect(() => {
    const handleOutsideClick = (
      event
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* ===========================================================
     TOGGLE
  =========================================================== */

  const handleToggle = async () => {
    const nextState = !open;

    setOpen(nextState);

    if (nextState) {
      await loadNotifications();
      await loadUnreadCount();
    }
  };

  /* ===========================================================
     MARK SINGLE READ
  =========================================================== */

  const handleNotificationClick =
    async (notification) => {
      if (!notification.isRead) {
        try {
          await markNotificationRead(
            notification._id
          );

          setNotifications(
            (prev) =>
              prev.map((item) =>
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
            (prev) =>
              Math.max(0, prev - 1)
          );
        } catch (error) {
          console.error(
            "Mark Notification Read Error:",
            error
          );
        }
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
          (prev) =>
            prev.map((item) => ({
              ...item,
              isRead: true,
            }))
        );

        setUnreadCount(0);

        toast.success(
          "All notifications marked as read."
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to update notifications."
        );
      }
    };

  /* ===========================================================
     DELETE
  =========================================================== */

  const handleDelete = async (
    event,
    notification
  ) => {
    event.stopPropagation();

    try {
      await deleteNotification(
        notification._id
      );

      setNotifications(
        (prev) =>
          prev.filter(
            (item) =>
              item._id !==
              notification._id
          )
      );

      if (!notification.isRead) {
        setUnreadCount(
          (prev) =>
            Math.max(0, prev - 1)
        );
      }

      toast.success(
        "Notification deleted."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete notification."
      );
    }
  };

  /* ===========================================================
     TIME FORMAT
  =========================================================== */

  const formatTime = (date) => {
    if (!date) return "";

    const created =
      new Date(date);

    const now =
      new Date();

    const difference =
      now - created;

    const minutes =
      Math.floor(
        difference / 60000
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
      return `${hours} hr ago`;
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

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* =====================================================
          BELL
      ===================================================== */}

      <button
        type="button"
        onClick={handleToggle}
        className="
          relative
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-600
          shadow-sm
          transition
          hover:bg-slate-50
          hover:text-blue-600
        "
        aria-label="Notifications"
      >
        <Bell size={21} />

        {unreadCount > 0 && (
          <span
            className="
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
              text-white
              shadow
            "
          >
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}
      </button>

      {/* =====================================================
          DROPDOWN
      ===================================================== */}

      {open && (
        <div
          className="
            fixed
            left-3
            right-3
            top-20
            z-[100]
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-2xl
            sm:absolute
            sm:left-auto
            sm:right-0
            sm:top-14
            sm:w-[420px]
          "
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Notifications
              </h3>

              <p className="text-sm text-slate-500">
                {unreadCount} unread
              </p>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={
                    handleMarkAllRead
                  }
                  title="Mark all as read"
                  className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                >
                  <CheckCheck
                    size={19}
                  />
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          {/* Content */}

          <div className="max-h-[500px] overflow-y-auto">
            {loading ? (
              <div className="p-10 text-center text-slate-500">
                Loading notifications...
              </div>
            ) : notifications.length ===
              0 ? (
              <div className="p-10 text-center">
                <Bell
                  size={34}
                  className="mx-auto text-slate-300"
                />

                <h4 className="mt-3 font-semibold text-slate-700">
                  No Notifications
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  New portfolio enquiries
                  will appear here.
                </p>
              </div>
            ) : (
              notifications.map(
                (notification) => (
                  <button
                    key={
                      notification._id
                    }
                    type="button"
                    onClick={() =>
                      handleNotificationClick(
                        notification
                      )
                    }
                    className={`
                      group
                      block
                      w-full
                      border-b
                      border-slate-100
                      p-4
                      text-left
                      transition
                      hover:bg-slate-50

                      ${
                        notification.isRead
                          ? "bg-white"
                          : "bg-blue-50/70"
                      }
                    `}
                  >
                    <div className="flex gap-3">
                      <div
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
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
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

                          <button
                            type="button"
                            onClick={(
                              event
                            ) =>
                              handleDelete(
                                event,
                                notification
                              )
                            }
                            title="Delete"
                            className="rounded-lg p-1.5 text-slate-400 opacity-100 transition hover:bg-red-50 hover:text-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                          >
                            <Trash2
                              size={16}
                            />
                          </button>
                        </div>

                        <div className="mt-3 space-y-1">
                          <p className="text-sm font-medium text-slate-700">
                            {notification.name}
                          </p>

                          <p className="truncate text-sm text-blue-600">
                            {
                              notification.email
                            }
                          </p>

                          <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-600">
                            {
                              notification.projectDetails
                            }
                          </p>
                        </div>

                        {!notification.isRead && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-600" />

                            <span className="text-xs font-medium text-blue-600">
                              New
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                )
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}