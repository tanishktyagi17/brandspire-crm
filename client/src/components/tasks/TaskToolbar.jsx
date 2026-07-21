import {
  Search,
  Plus,
  Filter,
  Flag,
  CheckCircle2,
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
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 px-6 py-5">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Task Manager
            </h2>

            <p className="mt-1 text-blue-100">
              Search, filter and organize your team's tasks.
            </p>

          </div>

          <Button
            onClick={onAddTask}
            className="rounded-2xl bg-white px-6 py-6 font-semibold text-blue-700 shadow-lg transition-all hover:scale-105 hover:bg-slate-100"
          >
            <Plus className="mr-2 h-5 w-5" />
            New Task
          </Button>

        </div>

      </div>

      {/* Toolbar */}

      <div className="p-6">

        <div className="grid gap-4 xl:grid-cols-3">

          {/* Search */}

          <div className="relative">

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
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 transition-all outline-none focus:border-blue-500 focus:bg-white"
            />

          </div>

          {/* Priority */}

          <div className="relative">

            <Flag
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 transition-all outline-none focus:border-blue-500 focus:bg-white"
            >
              <option value="All">
                All Priority
              </option>

              <option value="High">
                High Priority
              </option>

              <option value="Medium">
                Medium Priority
              </option>

              <option value="Low">
                Low Priority
              </option>

            </select>

          </div>

          {/* Status */}

          <div className="relative">

            <CheckCircle2
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 transition-all outline-none focus:border-blue-500 focus:bg-white"
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

        </div>

      </div>

    </div>
  );
}