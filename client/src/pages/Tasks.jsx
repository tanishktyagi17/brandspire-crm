import { useState } from "react";
import { toast } from "sonner";

import DashboardLayout from "../layouts/DashboardLayout";

import TaskStats from "../components/tasks/TaskStats";
import TaskToolbar from "../components/tasks/TaskToolbar";
import TaskList from "../components/tasks/TaskList";
import AddTaskDialog from "../components/tasks/AddTaskDialog";

import {
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export default function Tasks() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [refreshKey, setRefreshKey] =
    useState(0);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [isEditMode, setIsEditMode] =
    useState(false);

  function refreshList() {
    setRefreshKey((prev) => prev + 1);
  }

  async function handleAddTask(task) {
    try {
      await createTask(task);

      toast.success("Task added successfully.");

      refreshList();

      setDialogOpen(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create task."
      );
    }
  }

  function handleEditTask(task) {
    setSelectedTask(task);

    setIsEditMode(true);

    setDialogOpen(true);
  }

  async function handleUpdateTask(task) {
    try {
      await updateTask(task._id, task);

      toast.success("Task updated successfully.");

      refreshList();

      setDialogOpen(false);

      setSelectedTask(null);

      setIsEditMode(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update task."
      );
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);

      toast.success("Task deleted successfully.");

      refreshList();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete task."
      );
    }
  }

  async function handleCompleteTask(task) {
    try {
      await updateTask(task._id, {
        ...task,
        status: "Completed",
      });

      toast.success("Task marked as completed.");

      refreshList();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update task."
      );
    }
  }

  function handleCloseDialog() {
    setDialogOpen(false);

    setSelectedTask(null);

    setIsEditMode(false);
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Tasks
          </h1>

          <p className="mt-2 text-slate-500">
            Organize and track your team's daily tasks.
          </p>
        </div>

        <TaskStats refreshKey={refreshKey} />

        <TaskToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onAddTask={() => {
            setSelectedTask(null);
            setIsEditMode(false);
            setDialogOpen(true);
          }}
        />

        <TaskList
          refreshKey={refreshKey}
          searchTerm={searchTerm}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
        />

        <AddTaskDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          addTask={handleAddTask}
          updateTask={handleUpdateTask}
          selectedTask={selectedTask}
          isEditMode={isEditMode}
        />

      </div>
    </DashboardLayout>
  );
}