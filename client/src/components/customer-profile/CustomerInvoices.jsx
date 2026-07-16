import { Eye, Pencil, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getInvoices } from "../../lib/invoiceStorage";

export default function CustomerInvoices({ customerId }) {
  const navigate = useNavigate();

  const invoices = getInvoices()
    .filter(
      (invoice) =>
        String(invoice.customerId) === String(customerId)
    )
    .sort(
      (a, b) =>
        new Date(b.invoiceDate || 0) -
        new Date(a.invoiceDate || 0)
    );

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Customer Invoices
        </h2>

        <span className="text-sm text-gray-500">
          {invoices.length} Invoice(s)
        </span>

      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No invoices found for this customer.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-3">
                  Invoice
                </th>

                <th className="text-left p-3">
                  Date
                </th>

                <th className="text-left p-3">
                  Status
                </th>

                <th className="text-left p-3">
                  Amount
                </th>

                <th className="text-center p-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {invoices.map((invoice) => (

                <tr
                  key={invoice.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-3 font-semibold">
                    {invoice.id}
                  </td>

                  <td className="p-3">
                    {invoice.invoiceDate}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : invoice.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {invoice.status}
                    </span>

                  </td>

                  <td className="p-3 font-semibold">
                    ₹{Number(invoice.total || 0).toLocaleString()}
                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          navigate(
                            `/invoice/${invoice.customerId}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800"
                        title="View Invoice"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/invoice/${invoice.customerId}`
                          )
                        }
                        className="text-orange-500 hover:text-orange-700"
                        title="Edit Invoice"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => window.print()}
                        className="text-violet-600 hover:text-violet-800"
                        title="Print Invoice"
                      >
                        <Printer size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}