import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getInvoices } from "../lib/invoiceStorage";

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setInvoices(getInvoices());
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <h1 className="text-4xl font-bold">
          Invoice History
        </h1>

        <div className="bg-white border rounded-2xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Invoice</th>
                <th className="p-3 text-left">Customer ID</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Total</th>
              </tr>
            </thead>

            <tbody>

              {invoices.length === 0 ? (
                <tr>
                  <td className="p-4 text-gray-500" colSpan="5">
                    No invoices found
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="border-t">
                    <td className="p-3 font-semibold">
                      {inv.id}
                    </td>

                    <td className="p-3">
                      {inv.customerId}
                    </td>

                    <td className="p-3">
                      {inv.invoiceDate}
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                        {inv.status}
                      </span>
                    </td>

                    <td className="p-3 font-semibold">
                      ₹{inv.total}
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}