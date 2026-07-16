import {
  CalendarDays,
  CreditCard,
  FileText,
  Wallet,
} from "lucide-react";

export default function InvoiceHeader({
  customerId,
  invoice,
  setInvoice,
  isEditMode,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

          <div>

            <div className="flex items-center gap-3">

              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur">

                <FileText size={28} />

              </div>

              <div>

                <p className="text-blue-100 text-sm">
                  {isEditMode
                    ? "Editing Invoice"
                    : "Create New Invoice"}
                </p>

                <h1 className="text-3xl font-bold mt-1">
                  {invoice.invoiceNumber}
                </h1>

              </div>

            </div>

          </div>

          <div>

            <span
              className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold shadow ${
                invoice.status === "Paid"
                  ? "bg-green-500 text-white"
                  : invoice.status === "Pending"
                  ? "bg-yellow-400 text-black"
                  : invoice.status === "Overdue"
                  ? "bg-red-500 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {invoice.status}
            </span>

          </div>

        </div>

      </div>

      {/* Form */}
      <div className="p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Invoice Date */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">

              <CalendarDays size={16} />

              Invoice Date

            </label>

            <input
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) =>
                setInvoice((prev) => ({
                  ...prev,
                  invoiceDate: e.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white focus:outline-none"
            />

          </div>

          {/* Due Date */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">

              <CalendarDays size={16} />

              Due Date

            </label>

            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) =>
                setInvoice((prev) => ({
                  ...prev,
                  dueDate: e.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white focus:outline-none"
            />

          </div>

          {/* Currency */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">

              <Wallet size={16} />

              Currency

            </label>

            <select
              value={invoice.currency}
              onChange={(e) =>
                setInvoice((prev) => ({
                  ...prev,
                  currency: e.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white focus:outline-none"
            >
              <option value="INR">🇮🇳 INR</option>
              <option value="USD">🇺🇸 USD</option>
              <option value="EUR">🇪🇺 EUR</option>
              <option value="GBP">🇬🇧 GBP</option>
            </select>

          </div>

          {/* Payment Terms */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">

              <CreditCard size={16} />

              Payment Terms

            </label>

            <select
              value={invoice.paymentTerms}
              onChange={(e) =>
                setInvoice((prev) => ({
                  ...prev,
                  paymentTerms: e.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white focus:outline-none"
            >
              <option>Due on Receipt</option>
              <option>Net 7 Days</option>
              <option>Net 15 Days</option>
              <option>Net 30 Days</option>
              <option>Net 45 Days</option>
            </select>

          </div>

        </div>

        {/* Footer Info */}

        <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-5 flex flex-col md:flex-row md:justify-between gap-4">

          <div>

            <p className="text-sm text-slate-500">
              Customer ID
            </p>

            <p className="font-semibold text-slate-800">
              {customerId}
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Invoice Number
            </p>

            <p className="font-semibold text-blue-600">
              {invoice.invoiceNumber}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}