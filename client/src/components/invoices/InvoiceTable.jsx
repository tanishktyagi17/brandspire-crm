import InvoiceRow from "./InvoiceRow";

export default function InvoiceTable({
  invoices,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-5">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Invoice Records
          </h2>

          <p className="mt-1 text-blue-100">
            Manage and track all customer invoices
          </p>

        </div>

        <div className="rounded-2xl bg-white/20 px-4 py-2 text-white font-semibold">
          {invoices.length} Invoice{invoices.length !== 1 ? "s" : ""}
        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left font-semibold text-slate-700">
                Invoice
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-700">
                Customer
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-700">
                Date
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-right font-semibold text-slate-700">
                Amount
              </th>

              <th className="px-6 py-4 text-center font-semibold text-slate-700">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-16 text-center text-slate-500"
                >

                  <div className="flex flex-col items-center gap-3">

                    <div className="text-5xl">
                      📄
                    </div>

                    <h3 className="text-xl font-semibold text-slate-700">
                      No Invoices Found
                    </h3>

                    <p>
                      Create your first invoice to get started.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              invoices.map((invoice) => (
                <InvoiceRow
                  key={invoice.id}
                  invoice={invoice}
                  onDelete={onDelete}
                />
              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}