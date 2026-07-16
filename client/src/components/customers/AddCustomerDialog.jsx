import { useState, useEffect } from "react";

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
  updateCustomer,
  selectedCustomer,
  isEditMode,
}) {
  const emptyForm = {
    id: null,

    name: "",

    project: "",

    email: "",

    phone: "",

    address: "",

    city: "",

    state: "",

    country: "",

    pincode: "",

    website: "",

    gst: "",

    revenue: 0,

    notes: "",

    status: "Active",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) {
      if (isEditMode && selectedCustomer) {
        setForm({
          ...emptyForm,
          ...selectedCustomer,
        });
      } else {
        setForm(emptyForm);
      }
    }
  }, [open, isEditMode, selectedCustomer]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.project ||
      !form.email ||
      !form.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (isEditMode) {
      updateCustomer(form);
    } else {
      addCustomer(form);
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
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEditMode ? "Edit Customer" : "Add New Customer"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Basic Information */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Basic Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                name="name"
                placeholder="Customer Name *"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              />

              <input
                name="project"
                placeholder="Project Name *"
                value={form.project}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              />

              <input
                name="phone"
                placeholder="Phone *"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              />

            </div>

          </div>

          {/* Address */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Address
            </h3>

            <div className="space-y-4">

              <textarea
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border p-3 resize-none"
              />

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3"
                />

                <input
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3"
                />

                <input
                  name="country"
                  placeholder="Country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3"
                />

                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3"
                />

              </div>

            </div>

          </div>

          {/* Business Details */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Business Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                name="website"
                placeholder="Website"
                value={form.website}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              />

              <input
                name="gst"
                placeholder="GST Number"
                value={form.gst}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>

          </div>

          {/* Notes */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Additional Notes
            </h3>

            <textarea
              name="notes"
              placeholder="Write notes about this customer..."
              value={form.notes}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border p-3 resize-none"
            />

          </div>

          <DialogFooter className="pt-4">

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">

              {isEditMode
                ? "Update Customer"
                : "Save Customer"}

            </Button>

          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
}