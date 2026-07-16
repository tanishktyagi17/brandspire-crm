import {
  Calculator,
  BadgePercent,
  Receipt,
  Wallet,
} from "lucide-react";

export default function InvoiceSummary({
  subtotal,
  gst,
  setGst,
  discount,
  setDiscount,
  discountAmount,
  gstAmount,
  total,
}) {
  const rows = [
    {
      label: "Subtotal",
      value: subtotal,
      icon: Calculator,
      color: "text-slate-700",
      bg: "bg-slate-100",
    },
    {
      label: "Discount",
      value: discountAmount,
      icon: BadgePercent,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      label: "GST",
      value: gstAmount,
      icon: Receipt,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-5">

        <h2 className="text-2xl font-bold text-white">
          Invoice Summary
        </h2>

        <p className="text-blue-100 mt-1">
          Billing calculation
        </p>

      </div>

      <div className="p-7 space-y-6">

        {/* GST */}
        <div>

          <label className="block text-sm font-semibold text-slate-600 mb-2">
            GST (%)
          </label>

          <input
            type="number"
            value={gst}
            onChange={(e) =>
              setGst(Number(e.target.value))
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:bg-white outline-none transition"
          />

        </div>

        {/* Discount */}
        <div>

          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Discount (%)
          </label>

          <input
            type="number"
            value={discount}
            onChange={(e) =>
              setDiscount(Number(e.target.value))
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:bg-white outline-none transition"
          />

        </div>

        <div className="space-y-4">

          {rows.map((row) => {
            const Icon = row.icon;

            return (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200 px-5 py-4"
              >

                <div className="flex items-center gap-3">

                  <div
                    className={`h-11 w-11 rounded-xl ${row.bg} flex items-center justify-center`}
                  >
                    <Icon
                      className={row.color}
                      size={20}
                    />
                  </div>

                  <span className="font-medium text-slate-700">
                    {row.label}
                  </span>

                </div>

                <span className="font-bold text-lg">
                  ₹{row.value.toLocaleString()}
                </span>

              </div>
            );
          })}

        </div>

        {/* Grand Total */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-7 text-white shadow-xl">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">

                <Wallet size={28} />

              </div>

              <div>

                <p className="text-blue-100">
                  Grand Total
                </p>

                <h1 className="text-4xl font-bold mt-1">
                  ₹{total.toLocaleString()}
                </h1>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}