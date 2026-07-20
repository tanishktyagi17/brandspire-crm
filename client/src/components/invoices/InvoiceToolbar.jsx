import {
  Search,
  Plus,
  ArrowUpDown,
  Filter,
  Download,
} from "lucide-react";

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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

        {/* Left Side */}

        <div className="flex flex-1 flex-col gap-4 lg:flex-row">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search invoice number or customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 transition focus:border-blue-500 focus:bg-white focus:outline-none"
            />

          </div>

          {/* Status */}

          <div className="relative">

            <Filter
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 transition focus:border-blue-500 focus:bg-white focus:outline-none"
            >
              <option>All</option>
              <option>Draft</option>
              <option>Pending</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>

          </div>

          {/* Sort */}

          <div className="relative">

            <ArrowUpDown
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 transition focus:border-blue-500 focus:bg-white focus:outline-none"
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>Highest</option>
              <option>Lowest</option>
            </select>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex flex-wrap gap-3">

          <button
            className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <Download size={18} />
            Export
          </button>

          <Link
            to="/invoice/new"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            <Plus size={18} />
            New Invoice
          </Link>

        </div>

      </div>

    </div>
  );
}