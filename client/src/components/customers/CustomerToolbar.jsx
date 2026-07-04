import { useState } from "react";
import { Search, Download, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import AddCustomerDialog from "./AddCustomerDialog";

export default function CustomerToolbar({
  addCustomer,
  searchTerm,
  setSearchTerm,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col lg:flex-row gap-4 justify-between items-center">

        <div className="flex flex-col md:flex-row gap-4 w-full">

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border"
            />
          </div>

          <select className="px-4 py-3 rounded-xl border">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

        <div className="flex gap-3">

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>

        </div>

      </div>

      <AddCustomerDialog
        open={open}
        onClose={() => setOpen(false)}
        addCustomer={addCustomer}
      />
    </>
  );
}