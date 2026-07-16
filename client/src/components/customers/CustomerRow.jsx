import {
  Eye,
  Pencil,
  Trash2,
  Receipt,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function CustomerRow({
  customer,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <tr className="hover:bg-slate-50 border-b transition">

      <td className="px-6 py-4">

        <div className="flex items-center gap-3">

          <img
            src={`https://ui-avatars.com/api/?name=${customer.name}&background=2563eb&color=fff`}
            alt={customer.name}
            className="w-10 h-10 rounded-full"
          />

          <div>

            <p className="font-semibold">
              {customer.name}
            </p>

            <p className="text-sm text-gray-500">
              #{customer.id}
            </p>

          </div>

        </div>

      </td>

      <td className="px-6 py-4">
        {customer.project}
      </td>

      <td className="px-6 py-4">
        {customer.email}
      </td>

      <td className="px-6 py-4">
        {customer.phone}
      </td>

      <td className="px-6 py-4">

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            customer.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {customer.status}
        </span>

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-3">

          {/* View Profile */}

          <button
            onClick={() =>
              navigate(`/customer/${customer.id}`)
            }
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} />
          </button>

          {/* Edit */}

          <button
            onClick={() => onEdit(customer)}
            className="text-orange-500 hover:text-orange-700"
          >
            <Pencil size={18} />
          </button>

          {/* Invoice */}

          <button
            onClick={() =>
              navigate(`/invoice/${customer.id}`)
            }
            className="text-violet-600 hover:text-violet-800"
          >
            <Receipt size={18} />
          </button>

          {/* Delete */}

          <button
            onClick={() => onDelete(customer.id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}