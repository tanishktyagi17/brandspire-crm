import InvoiceRow from "./InvoiceRow";

export default function InvoiceTable({
  invoices,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">Invoice</th>

              <th className="text-left p-4">Customer</th>

              <th className="text-left p-4">Date</th>

              <th className="text-left p-4">Status</th>

              <th className="text-right p-4">Amount</th>

              <th className="text-center p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {invoices.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-gray-500"
                >
                  No invoices found.
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