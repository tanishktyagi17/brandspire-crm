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
    <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-6">

      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <h2 className="text-xl font-bold sm:text-2xl">
          Customer Invoices
        </h2>

        <span className="text-sm text-gray-500">
          {invoices.length} Invoice(s)
        </span>

      </div>

      {invoices.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          No invoices found for this customer.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl">

          <table className="min-w-[720px] w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-3 text-left text-sm font-semibold">
                  Invoice
                </th>

                <th className="p-3 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="p-3 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="p-3 text-left text-sm font-semibold">
                  Amount
                </th>

                <th className="p-3 text-center text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {invoices.map((invoice) => (

                <tr
                  key={invoice.id}
                  className="border-b transition hover:bg-slate-50"
                >

                  <td className="p-3 font-semibold whitespace-nowrap">
                    {invoice.id}
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {invoice.invoiceDate}
                  </td>

                  <td className="p-3">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
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

                  <td className="p-3 font-semibold whitespace-nowrap">
                    ₹{Number(invoice.total || 0).toLocaleString()}
                  </td>

                  <td className="p-3">

                    <div className="flex items-center justify-center gap-2">

                      <button
                        onClick={() =>
                          navigate(`/invoice/${invoice.customerId}`)
                        }
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-800"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/invoice/${invoice.customerId}`)
                        }
                        className="rounded-lg p-2 text-orange-500 transition hover:bg-orange-50 hover:text-orange-700"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => window.print()}
                        className="rounded-lg p-2 text-violet-600 transition hover:bg-violet-50 hover:text-violet-800"
                        title="Print"
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