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

      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-5 py-5 md:px-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur md:h-14 md:w-14">

            <Wallet
              size={26}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white md:text-2xl">
              Payment Details
            </h2>

            <p className="mt-1 text-sm text-emerald-100 md:text-base">
              Bank account for receiving payments
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 md:gap-6 md:p-8">

        {/* Account Holder */}

        <div className="rounded-2xl border bg-slate-50 p-5">

          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">

            <Building2 size={18} />

            Account Holder

          </label>

          <input
            type="text"
            defaultValue="Brandspire Technologies"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-emerald-500"
          />

        </div>

        {/* Bank */}

        <div className="rounded-2xl border bg-slate-50 p-5">

          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">

            <Landmark size={18} />

            Bank Name

          </label>

          <input
            type="text"
            defaultValue="State Bank of India"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-emerald-500"
          />

        </div>

        {/* Account Number */}

        <div className="rounded-2xl border bg-slate-50 p-5">

          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">

            <CreditCard size={18} />

            Account Number

          </label>

          <input
            type="text"
            defaultValue="XXXX XXXX XXXX 4589"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-emerald-500"
          />

        </div>

        {/* IFSC */}

        <div className="rounded-2xl border bg-slate-50 p-5">

          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">

            <Landmark size={18} />

            IFSC Code

          </label>

          <input
            type="text"
            defaultValue="SBIN0001234"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-emerald-500"
          />

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-5 py-5 md:px-8">

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

          <p className="text-sm leading-6 text-emerald-700">
            💡 Please mention your <strong>Invoice Number</strong> while
            making the payment. This helps us verify and process your payment
            quickly.
          </p>

        </div>

      </div>

    </div>
  );
}