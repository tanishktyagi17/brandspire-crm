import { FileText, Lightbulb } from "lucide-react";

export default function InvoiceNotes({
  notes,
  setNotes,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-5 py-5 md:px-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur md:h-14 md:w-14">

            <FileText
              size={26}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white md:text-2xl">
              Notes & Terms
            </h2>

            <p className="mt-1 text-sm text-orange-100 md:text-base">
              Additional information for your customer
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-6 p-5 md:p-8">

        <textarea
          rows={7}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter invoice notes..."
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-4
            md:p-5
            text-base
            text-slate-700
            leading-7
            transition
            outline-none
            focus:border-orange-500
            focus:bg-white
          "
        />

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 md:p-5">

          <div className="flex items-start gap-3">

            <Lightbulb
              className="mt-1 text-amber-600"
              size={22}
            />

            <div>

              <h3 className="font-semibold text-amber-700">
                Professional Tip
              </h3>

              <p className="mt-2 text-sm leading-7 text-amber-700">

                Include payment terms, warranty details,
                refund policy, project delivery timeline,
                or a thank-you message to make your
                invoices look more professional and build
                trust with your clients.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}