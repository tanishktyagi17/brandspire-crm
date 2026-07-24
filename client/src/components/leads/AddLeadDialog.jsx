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
    _id: null,
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "Website",
    stage: "New",
    value: "",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) {
      if (isEditMode && selectedLead) {
        setForm({
          ...emptyForm,
          ...selectedLead,
        });
      } else {
        setForm(emptyForm);
      }
    }
  }, [open, isEditMode, selectedLead]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.company.trim() ||
      !form.email.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const payload = {
      ...form,
      value: Number(form.value || 0),
    };

    if (isEditMode) {
      updateLead(payload);
    } else {
      addLead(payload);
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
      <DialogContent className="sm:max-w-xl">
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
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />

          <input
            name="value"
            type="number"
            placeholder="Lead Value"
            value={form.value}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />

          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option>Website</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>LinkedIn</option>
            <option>Google</option>
            <option>Referral</option>
            <option>WhatsApp</option>
            <option>Cold Call</option>
            <option>Other</option>
          </select>

          <select
            name="stage"
            value={form.stage}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Won</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notes"
            rows={4}
            value={form.notes}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />

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