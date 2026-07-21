import {
  Search,
  Plus,
  Filter,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function LeadToolbar({
  searchTerm,
  setSearchTerm,
  stageFilter,
  setStageFilter,
  onAddLead,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        {/* Left */}
        <div className="flex flex-col md:flex-row gap-4 flex-1">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search lead, company or email..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Stage */}

          <div className="relative">

            <Filter
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={stageFilter}
              onChange={(e) =>
                setStageFilter(e.target.value)
              }
              className="w-full md:w-52 rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-5 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="All">All Stages</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Won">Won</option>
            </select>

          </div>

        </div>

        {/* Right */}

        <Button
          onClick={onAddLead}
          className="h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Lead
        </Button>

      </div>

    </div>
  );
}