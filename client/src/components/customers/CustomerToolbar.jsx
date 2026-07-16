import { Search, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomerToolbar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onAddCustomer,
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col lg:flex-row justify-between gap-4">

      <div className="flex flex-col md:flex-row gap-4 flex-1">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-xl py-3 pl-11 pr-4"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      <div className="flex gap-3">

        <Button variant="outline">

          <Download className="mr-2 h-4 w-4" />

          Export

        </Button>

        <Button onClick={onAddCustomer}>

          <Plus className="mr-2 h-4 w-4" />

          Add Customer

        </Button>

      </div>

    </div>
  );
}