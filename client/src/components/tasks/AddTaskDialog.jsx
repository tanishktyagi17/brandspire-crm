import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  ClipboardList,
  FileText,
  CalendarDays,
  Flag,
  CheckCircle2,
} from "lucide-react";

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
    if (!open) return;

    if (isEditMode && selectedTask) {
      setForm(selectedTask);
    } else {
      setForm(emptyForm);
    }
  }, [open, isEditMode, selectedTask]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.dueDate
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (isEditMode) {
      updateTask(form);
    } else {
      addTask({
        ...form,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
    }

    setForm(emptyForm);
    onClose();
  }

  const inputStyle =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:bg-white";

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="overflow-hidden rounded-3xl border-0 p-0 sm:max-w-3xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-6">

          <DialogHeader>

            <DialogTitle className="flex items-center gap-3 text-3xl font-bold text-white">

              <ClipboardList size={30} />

              {isEditMode
                ? "Edit Task"
                : "Create New Task"}

            </DialogTitle>

            <p className="mt-2 text-blue-100">
              Organize your work and keep your team productive.
            </p>

          </DialogHeader>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-7 p-8"
        >

          {/* Title */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

              <ClipboardList size={18} />

              Task Title

            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              className={inputStyle}
            />

          </div>

          {/* Description */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

              <FileText size={18} />

              Description

            </label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe this task..."
              className={`${inputStyle} resize-none`}
            />

          </div>

          {/* Grid */}

          <div className="grid gap-5 md:grid-cols-3">

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                <CalendarDays size={18} />

                Due Date

              </label>

              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className={inputStyle}
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                <Flag size={18} />

                Priority

              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                <CheckCircle2 size={18} />

                Status

              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

          </div>

          {/* Footer */}

          <DialogFooter className="flex flex-col gap-3 pt-3 sm:flex-row">

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-2xl px-6"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 hover:from-blue-700 hover:to-indigo-700"
            >
              {isEditMode
                ? "Update Task"
                : "Create Task"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
}