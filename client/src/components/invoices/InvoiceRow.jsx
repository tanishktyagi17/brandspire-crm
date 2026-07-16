import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { toast } from "sonner";

import DeleteDialog from "../common/DeleteDialog";

import { deleteInvoice } from "../../lib/invoiceStorage";

export default function InvoiceRow({
  invoice,
}) {
  const badgeColors = {
    Draft: "bg-gray-100 text-gray-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Paid: "bg-green-100 text-green-700",
    Overdue: "bg-red-100 text-red-700",
  };

  const handleDelete = () => {
    deleteInvoice(invoice.id);

    toast.success("Invoice deleted successfully.");

    window.location.reload();
  };

  return (
    <tr className="border-t hover:bg-slate-50 transition">

      <td className="p-4">
        <div>
          <h3 className="font-semibold">
            {invoice.invoiceNumber}
          </h3>

          <p className="text-sm text-gray-500">
            {invoice.paymentTerms}
          </p>
        </div>
      </td>

      <td className="p-4">
        <div>
          <h3 className="font-medium">
            {invoice.customer?.name}
          </h3>

          <p className="text-sm text-gray-500">
            {invoice.customer?.email}
          </p>
        </div>
      </td>

      <td className="p-4">
        {invoice.invoiceDate}
      </td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColors[invoice.status]}`}
        >
          {invoice.status}
        </span>
      </td>

      <td className="p-4 text-right font-semibold text-blue-600">
        ₹{Number(invoice.total || 0).toLocaleString()}
      </td>

      <td className="p-4">
        <div className="flex justify-center items-center gap-4">

          <Link
            to={`/invoices/${invoice.id}`}
            className="text-blue-600 hover:text-blue-800 transition"
            title="View Invoice"
          >
            <Eye size={18} />
          </Link>

          <Link
            to={`/invoice/edit/${invoice.id}`}
            className="text-green-600 hover:text-green-800 transition"
            title="Edit Invoice"
          >
            <Pencil size={18} />
          </Link>

          <DeleteDialog
            title="Delete Invoice"
            description="Are you sure you want to permanently delete this invoice? This action cannot be undone."
            onConfirm={handleDelete}
            trigger={
              <button
                className="text-red-600 hover:text-red-800 transition"
                title="Delete Invoice"
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