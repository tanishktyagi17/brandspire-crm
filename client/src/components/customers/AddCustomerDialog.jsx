import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AddCustomerDialog({
  open,
  onClose,
  addCustomer,
}) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "Active",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
  e.preventDefault();

  addCustomer(form);

  setForm({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "Active",
  });

  onClose();
}

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>
            Add New Customer
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="name"
            placeholder="Customer Name"
            className="w-full border rounded-xl p-3"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="company"
            placeholder="Company"
            className="w-full border rounded-xl p-3"
            value={form.company}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border rounded-xl p-3"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            className="w-full border rounded-xl p-3"
            value={form.phone}
            onChange={handleChange}
          />

          <select
            name="status"
            className="w-full border rounded-xl p-3"
            value={form.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
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
              Save Customer
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
}