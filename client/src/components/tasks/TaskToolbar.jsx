import {
  Search,
  Plus,
  Filter,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function TaskToolbar({
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  onAddTask,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

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
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white"
            />

          </div>

          {/* Priority */}

          <div className="relative">

            <Filter
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
              className="min-w-[180px] rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white"
            >
              <option value="All">
                All Priority
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="min-w-[180px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:bg-white"
          >
            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

        </div>

        {/* Right Side */}

        <Button
          onClick={onAddTask}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="mr-2 h-5 w-5" />

          New Task
        </Button>

      </div>

    </div>
  );
}