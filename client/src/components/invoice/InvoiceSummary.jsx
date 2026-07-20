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
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-5 md:px-7">

        <h2 className="text-xl font-bold text-white md:text-2xl">
          Invoice Summary
        </h2>

        <p className="mt-1 text-sm text-blue-100 md:text-base">
          Billing calculation
        </p>

      </div>

      <div className="space-y-6 p-5 md:p-7">

        {/* GST */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-600">
            GST (%)
          </label>

          <input
            type="number"
            value={gst}
            onChange={(e) => setGst(Number(e.target.value))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none"
          />

        </div>

        {/* Discount */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Discount (%)
          </label>

          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none"
          />

        </div>

        {/* Calculation Rows */}

        <div className="space-y-4">

          {rows.map((row) => {
            const Icon = row.icon;

            return (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-5"
              >

                <div className="flex items-center gap-3">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${row.bg}`}
                  >
                    <Icon
                      size={20}
                      className={row.color}
                    />
                  </div>

                  <span className="font-medium text-slate-700">
                    {row.label}
                  </span>

                </div>

                <span className="text-base font-bold md:text-lg">
                  ₹{row.value.toLocaleString()}
                </span>

              </div>
            );
          })}

        </div>

        {/* Grand Total */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-5 text-white shadow-xl md:p-7">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">

                <Wallet size={28} />

              </div>

              <div>

                <p className="text-blue-100">
                  Grand Total
                </p>

                <h1 className="mt-1 text-3xl font-bold md:text-4xl">
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