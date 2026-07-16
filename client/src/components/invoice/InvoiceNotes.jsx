import { FileText, Lightbulb } from "lucide-react";

export default function InvoiceNotes({
  notes,
  setNotes,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

            <FileText
              size={28}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Notes & Terms
            </h2>

            <p className="text-orange-100">
              Additional information for your customer
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-6 p-8">

        <textarea
          rows={7}
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          placeholder="Enter invoice notes..."
          className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700 transition outline-none focus:border-orange-500 focus:bg-white"
        />

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">

          <div className="flex items-start gap-3">

            <Lightbulb
              className="mt-1 text-amber-600"
              size={22}
            />

            <div>

              <h3 className="font-semibold text-amber-700">
                Professional Tip
              </h3>

              <p className="mt-2 text-sm leading-6 text-amber-700">

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