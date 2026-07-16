import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function InvoiceToolbar({
  search,
  setSearch,
  status,
  setStatus,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">

      <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search invoice number or customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-xl pl-11 pr-4 py-3"
          />

        </div>

        <div className="flex flex-wrap gap-3">

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
          >
            <option>All</option>
            <option>Draft</option>
            <option>Pending</option>
            <option>Paid</option>
            <option>Overdue</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Highest</option>
            <option>Lowest</option>
          </select>

          <Link
            to="/invoice/new"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-3 flex items-center gap-2"
          >
            <Plus size={18} />
            New Invoice
          </Link>

        </div>

      </div>

    </div>
  );
}