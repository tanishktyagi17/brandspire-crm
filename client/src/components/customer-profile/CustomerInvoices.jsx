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
    <div className="rounded-2xl border bg-white p-4 shadow-sm lg:p-6">

      {/* Header */}

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <h2 className="text-xl font-bold text-slate-800 lg:text-2xl">
          Customer Invoices
        </h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {invoices.length} Invoice{invoices.length !== 1 ? "s" : ""}
        </span>

      </div>

      {invoices.length === 0 ? (
        <div className="py-14 text-center text-slate-500">
          No invoices found for this customer.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-[700px] w-full">

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

                  <td className="p-4 font-semibold text-slate-800">
                    #{invoice.id}
                  </td>

                  <td className="p-4 text-slate-600">
                    {invoice.invoiceDate}
                  </td>

                  <td className="p-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

                  <td className="p-4 font-semibold text-slate-800">
                    ₹{Number(invoice.total || 0).toLocaleString()}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          navigate(`/invoice/${invoice.customerId}`)
                        }
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/invoice/${invoice.customerId}`)
                        }
                        className="rounded-lg p-2 text-orange-500 transition hover:bg-orange-50"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => window.print()}
                        className="rounded-lg p-2 text-violet-600 transition hover:bg-violet-50"
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