import {
  Building2,
  IndianRupee,
  Pencil,
  Trash2,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

import DeleteDialog from "@/components/common/DeleteDialog";

const stageColors = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  Qualified: "bg-violet-100 text-violet-700",
  Won: "bg-emerald-100 text-emerald-700",
};

export default function LeadCard({
  lead,
  onEdit,
  onDelete,
}) {
  const initials = lead.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-xl"
    >
      {/* Top */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white shadow-md">
            {initials || <User size={20} />}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {lead.name}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Building2 size={15} />
              {lead.company}
            </div>
          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${stageColors[lead.stage]}`}
        >
          {lead.stage}
        </span>

      </div>

      {/* Value */}

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">

        <p className="text-xs uppercase tracking-wide text-slate-500">
          Lead Value
        </p>

        <div className="mt-2 flex items-center gap-2 text-2xl font-bold text-slate-800">
          <IndianRupee size={22} />
          {lead.value}
        </div>

      </div>

      {/* Actions */}

      <div className="mt-5 flex gap-3">

        <button
          onClick={() => onEdit(lead)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 py-2 font-medium text-blue-700 transition hover:bg-blue-100"
        >
          <Pencil size={16} />
          Edit
        </button>

        <DeleteDialog
          title="Delete Lead"
          description={`Are you sure you want to delete "${lead.name}"? This action cannot be undone.`}
          onConfirm={() => onDelete(lead.id)}
          trigger={
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2 font-medium text-red-700 transition hover:bg-red-100"
            >
              <Trash2 size={16} />
              Delete
            </button>
          }
        />

      </div>

    </motion.div>
  );
}