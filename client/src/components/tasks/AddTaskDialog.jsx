import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AddTaskDialog({
  open,
  onClose,
  addTask,
  updateTask,
  selectedTask,
  isEditMode,
}) {
  const emptyForm = {
    id: null,
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) {
      if (isEditMode && selectedTask) {
        setForm(selectedTask);
      } else {
        setForm(emptyForm);
      }
    }
  }, [open, isEditMode, selectedTask]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.dueDate
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (isEditMode) {
      updateTask(form);
    } else {
      addTask({
        ...form,
        id: Date.now(),
      });
    }

    onClose();

    setForm(emptyForm);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="sm:max-w-xl rounded-3xl">

        <DialogHeader>

          <DialogTitle className="text-2xl">
            {isEditMode
              ? "Edit Task"
              : "New Task"}
          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-2xl border p-3"
          />

          <textarea
            name="description"
            rows={4}
            placeholder="Task Description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-2xl border p-3 resize-none"
          />

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full rounded-2xl border p-3"
          />

          <div className="grid gap-4 md:grid-cols-2">

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="rounded-2xl border p-3"
            >
              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="rounded-2xl border p-3"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

          <DialogFooter>

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              {isEditMode
                ? "Update Task"
                : "Save Task"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
}