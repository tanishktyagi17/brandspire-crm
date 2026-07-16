import { useEffect, useState } from "react";

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
      // Pending first
      if (a.status !== b.status) {
        if (a.status === "Pending") return -1;
        if (b.status === "Pending") return 1;
      }

      // Priority
      const priorityDiff =
        priorityOrder[a.priority] -
        priorityOrder[b.priority];

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      // Due Date
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);

      if (
        !isNaN(dateA.getTime()) &&
        !isNaN(dateB.getTime())
      ) {
        return dateA - dateB;
      }

      // Fallback
      return (
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
      );
    });

  if (filteredTasks.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white py-20 text-center">
        <h3 className="text-xl font-semibold text-slate-700">
          No Tasks Found
        </h3>

        <p className="mt-2 text-slate-500">
          Try changing your search or filters, or create a new task.
        </p>
      </div>
    );
  }

  return (
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
  );
}