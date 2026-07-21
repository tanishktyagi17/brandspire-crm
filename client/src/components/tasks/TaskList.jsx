import { useEffect, useState } from "react";

import {
  ClipboardList,
  SearchX,
} from "lucide-react";

import { getTasks } from "@/lib/taskStorage";

import TaskCard from "./TaskCard";

export default function TaskList({
  refreshKey,
  searchTerm,
  priorityFilter,
  statusFilter,
  onEdit,
  onDelete,
  onComplete,
}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, [refreshKey]);

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
      );
    })
    .sort((a, b) => {
      if (a.status !== b.status) {
        if (a.status === "Pending") return -1;
        if (b.status === "Pending") return 1;
      }

      const priorityDiff =
        priorityOrder[a.priority] -
        priorityOrder[b.priority];

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);

      if (
        !isNaN(dateA.getTime()) &&
        !isNaN(dateB.getTime())
      ) {
        return dateA - dateB;
      }

      return (
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
      );
    });

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="flex items-center gap-4 border-b bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

          <ClipboardList size={24} />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Task List
          </h2>

          <p className="text-slate-500">
            {filteredTasks.length} task
            {filteredTasks.length !== 1 && "s"} found
          </p>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 py-20">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

              <SearchX
                size={40}
                className="text-blue-600"
              />

            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-700">
              No Tasks Found
            </h3>

            <p className="mt-2 max-w-md text-center text-slate-500">
              We couldn't find any tasks matching your
              current search or filters. Try adjusting
              the filters or create a new task.
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onComplete={onComplete}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}