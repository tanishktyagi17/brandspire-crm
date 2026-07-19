import {
  Eye,
  Pencil,
  Trash2,
  Receipt,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function CustomerCard({
  customer,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg">

      {/* Top */}

      <div className="flex items-center gap-4">

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            customer.name
          )}&background=2563eb&color=fff`}
          alt={customer.name}
          className="h-14 w-14 rounded-full"
        />

        <div className="flex-1 min-w-0">

          <h3 className="truncate text-lg font-bold text-slate-800">
            {customer.name}
          </h3>

          <p className="text-sm text-slate-500">
            #{customer.id}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            customer.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {customer.status}
        </span>

      </div>

      {/* Details */}

      <div className="mt-5 space-y-3 text-sm">

        <div className="flex justify-between gap-4">
          <span className="font-medium text-slate-500">
            Project
          </span>

          <span className="text-right font-semibold text-slate-800">
            {customer.project}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="font-medium text-slate-500">
            Email
          </span>

          <span className="truncate text-right text-slate-800">
            {customer.email}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="font-medium text-slate-500">
            Phone
          </span>

          <span className="text-slate-800">
            {customer.phone}
          </span>
        </div>

      </div>

      {/* Actions */}

      <div className="mt-6 grid grid-cols-4 gap-3">

        <button
          onClick={() =>
            navigate(`/customer/${customer.id}`)
          }
          className="flex h-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-100"
        >
          <Eye size={20} />
        </button>

        <button
          onClick={() => onEdit(customer)}
          className="flex h-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition hover:bg-orange-100"
        >
          <Pencil size={20} />
        </button>

        <button
          onClick={() =>
            navigate(`/invoice/${customer.id}`)
          }
          className="flex h-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition hover:bg-violet-100"
        >
          <Receipt size={20} />
        </button>

        <button
          onClick={() => onDelete(customer.id)}
          className="flex h-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={20} />
        </button>

      </div>

    </div>
  );
}