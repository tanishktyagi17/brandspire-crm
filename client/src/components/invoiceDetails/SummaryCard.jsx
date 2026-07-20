import {
  FileText,
  Lightbulb,
  Calculator,
  BadgePercent,
  Receipt,
  Wallet,
} from "lucide-react";

export default function SummaryCard({ invoice }) {
  const rows = [
    {
      title: "Subtotal",
      value: invoice.subtotal,
      icon: Calculator,
      color: "bg-slate-100 text-slate-700",
    },
    {
      title: "Discount",
      value: invoice.discountAmount,
      icon: BadgePercent,
      color: "bg-red-100 text-red-600",
      negative: true,
    },
    {
      title: "GST",
      value: invoice.gstAmount,
      icon: Receipt,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Notes Card */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">

              <FileText
                size={28}
                className="text-white"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Notes
              </h2>

              <p className="text-orange-100">
                Additional invoice information
              </p>

            </div>

          </div>

        </div>

        <div className="space-y-6 p-7">

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <p className="whitespace-pre-line leading-7 text-slate-700">
              {invoice.notes || "No notes available."}
            </p>

          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">

            <div className="flex gap-3">

              <Lightbulb
                className="mt-1 text-amber-600"
                size={22}
              />

              <div>

                <h3 className="font-semibold text-amber-700">
                  Invoice Information
                </h3>

                <p className="mt-2 text-sm leading-6 text-amber-700">
                  This section contains additional notes,
                  payment instructions and customer
                  information saved with the invoice.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Summary Card */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

        <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-5">

          <h2 className="text-2xl font-bold text-white">
            Invoice Summary
          </h2>

          <p className="mt-1 text-blue-100">
            Financial breakdown
          </p>

        </div>

        <div className="space-y-5 p-7">

          {rows.map((row) => {
            const Icon = row.icon;

            return (
              <div
                key={row.title}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
              >

                <div className="flex items-center gap-3">

                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center ${row.color}`}
                  >
                    <Icon size={20} />
                  </div>

                  <span className="font-medium text-slate-700">
                    {row.title}
                  </span>

                </div>

                <span
                  className={`font-bold text-lg ${
                    row.negative
                      ? "text-red-600"
                      : "text-slate-800"
                  }`}
                >
                  {row.negative ? "- " : ""}
                  ₹{Number(row.value).toLocaleString()}
                </span>

              </div>
            );
          })}

          {/* Grand Total */}

          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-7 text-white shadow-xl">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">

                  <Wallet size={28} />

                </div>

                <div>

                  <p className="text-blue-100">
                    Grand Total
                  </p>

                  <h1 className="mt-1 text-4xl font-bold">
                    ₹{Number(invoice.total).toLocaleString()}
                  </h1>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}