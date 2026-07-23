import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomerToolbar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onAddCustomer,
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Search + Filter */}

        <div className="flex flex-1 flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                py-3
                pl-11
                pr-4
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              lg:w-52
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
            "
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Add Customer Button */}

        <div className="flex shrink-0">
          <Button
            onClick={onAddCustomer}
            className="h-11 min-w-[170px]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>

      </div>
    </div>
  );
}