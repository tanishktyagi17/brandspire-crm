import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AddLeadDialog({
  open,
  onClose,
  addLead,
  updateLead,
  selectedLead,
  isEditMode,
}) {
  const emptyForm = {
    id: null,
    name: "",
    company: "",
    value: "",
    stage: "New",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) {
      if (isEditMode && selectedLead) {
        setForm(selectedLead);
      } else {
        setForm(emptyForm);
      }
    }
  }, [open, isEditMode, selectedLead]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.company.trim() ||
      !form.value.trim()
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (isEditMode) {
      updateLead(form);
    } else {
      addLead({
        ...form,
        id: Date.now(),
      });
    }

    setForm(emptyForm);
    onClose();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Lead" : "Add New Lead"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Lead Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />

          <input
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />

          <input
            name="value"
            placeholder="Lead Value (₹)"
            value={form.value}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />

          <select
            name="stage"
            value={form.stage}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Won">Won</option>
          </select>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              {isEditMode ? "Update Lead" : "Save Lead"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}