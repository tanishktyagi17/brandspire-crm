import {
  Building2,
  CreditCard,
  Landmark,
  Wallet,
} from "lucide-react";

export default function PaymentDetails() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

            <Wallet
              size={28}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Payment Details
            </h2>

            <p className="text-emerald-100">
              Bank account for receiving payments
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="grid gap-6 p-8 md:grid-cols-2">

        <div className="rounded-2xl border bg-slate-50 p-5">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">

            <Building2 size={18} />

            Account Holder

          </label>

          <input
            type="text"
            defaultValue="Brandspire Technologies"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-emerald-500"
          />

        </div>

        <div className="rounded-2xl border bg-slate-50 p-5">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">

            <Landmark size={18} />

            Bank Name

          </label>

          <input
            type="text"
            defaultValue="State Bank of India"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-emerald-500"
          />

        </div>

        <div className="rounded-2xl border bg-slate-50 p-5">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">

            <CreditCard size={18} />

            Account Number

          </label>

          <input
            type="text"
            defaultValue="XXXX XXXX XXXX 4589"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-emerald-500"
          />

        </div>

        <div className="rounded-2xl border bg-slate-50 p-5">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">

            <Landmark size={18} />

            IFSC Code

          </label>

          <input
            type="text"
            defaultValue="SBIN0001234"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-emerald-500"
          />

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-8 py-5">

        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">

          <p className="text-sm text-emerald-700">

            💡 Please mention your Invoice Number while making the payment.
            This helps us verify and process your payment quickly.

          </p>

        </div>

      </div>

    </div>
  );
}