import {
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";

import { Link } from "react-router-dom";
import { toast } from "sonner";

import DeleteDialog from "../common/DeleteDialog";

import { deleteInvoice } from "../../services/invoiceService";

export default function InvoiceRow({
  invoice,
  onDelete,
}) {
  const badgeColors = {
    Draft: "bg-slate-100 text-slate-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Paid: "bg-green-100 text-green-700",
    Overdue: "bg-red-100 text-red-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const handleDelete = async () => {
    try {
      await deleteInvoice(invoice._id);

      toast.success(
        "Invoice deleted successfully."
      );

      if (onDelete) {
        onDelete(invoice._id);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete invoice."
      );
    }
  };

  return (
    <tr className="border-b transition-all hover:bg-slate-50">

      {/* Invoice */}

      <td className="px-6 py-5">

        <div>

          <h3 className="font-bold text-slate-800">
            {invoice.invoiceNumber}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {invoice.paymentTerms}
          </p>

        </div>

      </td>

      {/* Customer */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              invoice.customer?.name || "Customer"
            )}&background=2563eb&color=fff`}
            alt={invoice.customer?.name}
            className="h-11 w-11 rounded-full shadow"
          />

          <div>

            <p className="font-semibold text-slate-800">
              {invoice.customer?.name}
            </p>

            <p className="text-sm text-slate-500">
              {invoice.customer?.email}
            </p>

          </div>

        </div>

      </td>

      {/* Date */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2 text-slate-600">

          <CalendarDays size={16} />

          {invoice.invoiceDate ||
            invoice.issueDate?.split("T")[0]}

        </div>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <span
          className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
            badgeColors[invoice.status] ||
            "bg-slate-100 text-slate-700"
          }`}
        >
          {invoice.status}
        </span>

      </td>

      {/* Amount */}

      <td className="px-6 py-5 text-right">

        <span className="text-lg font-bold text-blue-600">
          ₹
          {Number(
            invoice.total || 0
          ).toLocaleString()}
        </span>

      </td>

      {/* Actions */}

      <td className="px-6 py-5">

        <div className="flex justify-center gap-3">

          <Link
            to={`/invoices/${invoice._id}`}
            title="View Invoice"
            className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            <Eye size={18} />
          </Link>

          <Link
            to={`/invoice/edit/${invoice._id}`}
            title="Edit Invoice"
            className="rounded-lg bg-green-100 p-2 text-green-600 transition hover:bg-green-600 hover:text-white"
          >
            <Pencil size={18} />
          </Link>

          <DeleteDialog
            title="Delete Invoice"
            description="Are you sure you want to permanently delete this invoice? This action cannot be undone."
            onConfirm={handleDelete}
            trigger={
              <button
                title="Delete Invoice"
                className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                <Trash2 size={18} />
              </button>
            }
          />

        </div>

      </td>

    </tr>
  );
}