import {
  CalendarDays,
  CheckCircle2,
  CircleCheckBig,
  Clock3,
  Pencil,
  Trash2,
  User,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import DeleteDialog from "@/components/common/DeleteDialog";

const priorityColors = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

const statusColors = {
  Pending: "bg-orange-100 text-orange-700",
  Completed: "bg-green-100 text-green-700",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onComplete,
}) {
  const navigate = useNavigate();

  const initials = task.title
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function getDueDateInfo() {
    if (task.status === "Completed") {
      return {
        label: "Completed",
        color: "bg-green-100 text-green-700",
      };
    }

    if (!task.dueDate) {
      return {
        label: "No Due Date",
        color: "bg-slate-100 text-slate-600",
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.round(
      (due - today) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) {
      return {
        label: `Overdue by ${Math.abs(diffDays)} Day${
          Math.abs(diffDays) > 1 ? "s" : ""
        }`,
        color: "bg-red-100 text-red-700",
      };
    }

    if (diffDays === 0) {
      return {
        label: "Due Today",
        color: "bg-orange-100 text-orange-700",
      };
    }

    if (diffDays === 1) {
      return {
        label: "Due Tomorrow",
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: `${diffDays} Days Left`,
      color: "bg-blue-100 text-blue-700",
    };
  }

  const dueInfo = getDueDateInfo();

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
    >
      {/* Header */}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white shadow-md">
            {initials || <User size={20} />}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {task.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {task.description}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Info */}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Due Date
          </p>

          <div className="flex items-center gap-2 font-medium text-slate-700">
            <CalendarDays size={18} />
            {task.dueDate}
          </div>

          <div
            className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${dueInfo.color}`}
          >
            <AlertTriangle size={14} />
            {dueInfo.label}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Status
          </p>

          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
              statusColors[task.status]
            }`}
          >
            {task.status === "Completed" ? (
              <CheckCircle2 size={16} />
            ) : (
              <Clock3 size={16} />
            )}

            {task.status}
          </div>
        </div>
      </div>

      {/* Actions */}

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

        <button
          onClick={() => navigate(`/tasks/${task.id}`)}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <Eye size={16} />
          View
        </button>

        {task.status !== "Completed" && (
          <button
            onClick={() => onComplete(task)}
            className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 py-2 font-medium text-green-700 transition hover:bg-green-100"
          >
            <CircleCheckBig size={16} />
            Complete
          </button>
        )}

        <button
          onClick={() => onEdit(task)}
          className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 py-2 font-medium text-blue-700 transition hover:bg-blue-100"
        >
          <Pencil size={16} />
          Edit
        </button>

        <DeleteDialog
          title="Delete Task"
          description={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
          onConfirm={() => onDelete(task.id)}
          trigger={
            <button className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2 font-medium text-red-700 transition hover:bg-red-100">
              <Trash2 size={16} />
              Delete
            </button>
          }
        />

      </div>
    </motion.div>
  );
}