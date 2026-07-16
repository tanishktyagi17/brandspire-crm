import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  FileText,
} from "lucide-react";

import DashboardLayout from "@/layouts/DashboardLayout";
import { getTaskById } from "@/lib/taskStorage";

const priorityColors = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

const statusColors = {
  Pending: "bg-orange-100 text-orange-700",
  Completed: "bg-green-100 text-green-700",
};

export default function TaskDetails() {
  const { taskId } = useParams();

  const task = getTaskById(taskId);

  if (!task) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl bg-white p-12 shadow-sm text-center">
          <h2 className="text-3xl font-bold text-slate-800">
            Task Not Found
          </h2>

          <p className="mt-3 text-slate-500">
            The task you are looking for doesn't exist.
          </p>

          <Link
            to="/tasks"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Tasks
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Back Button */}

        <Link
          to="/tasks"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Tasks
        </Link>

        {/* Header */}

        <div className="rounded-3xl bg-white p-8 shadow-sm border">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                {task.title}
              </h1>

              <p className="mt-3 text-slate-500">
                Complete information about this task.
              </p>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority} Priority
            </span>

          </div>

        </div>

        {/* Details */}

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold text-slate-800">
              Description
            </h2>

            <div className="flex items-start gap-3">

              <FileText className="mt-1 text-slate-500" />

              <p className="leading-7 text-slate-600">
                {task.description}
              </p>

            </div>

          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold text-slate-800">
              Task Information
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2 text-slate-500">
                  <CalendarDays size={18} />
                  Due Date
                </span>

                <span className="font-semibold">
                  {task.dueDate}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2 text-slate-500">
                  <Flag size={18} />
                  Priority
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2 text-slate-500">

                  {task.status === "Completed" ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Clock3 size={18} />
                  )}

                  Status

                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    statusColors[task.status]
                  }`}
                >
                  {task.status}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}