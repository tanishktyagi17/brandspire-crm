export default function SummaryCard({ invoice }) {
  return (
    <div className="grid xl:grid-cols-2 gap-6">

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Notes
        </h2>

        <p className="text-gray-600 whitespace-pre-line">
          {invoice.notes || "No notes available."}
        </p>

      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Invoice Summary
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">

            <span>Subtotal</span>

            <span className="font-semibold">
              ₹{invoice.subtotal.toLocaleString()}
            </span>

          </div>

          <div className="flex justify-between">

            <span>Discount</span>

            <span className="text-red-600 font-semibold">
              - ₹
              {invoice.discountAmount.toLocaleString()}
            </span>

          </div>

          <div className="flex justify-between">

            <span>GST</span>

            <span className="font-semibold">
              ₹{invoice.gstAmount.toLocaleString()}
            </span>

          </div>

          <hr />

          <div className="flex justify-between items-center">

            <span className="text-2xl font-bold">
              Grand Total
            </span>

            <span className="text-3xl font-bold text-blue-600">
              ₹{invoice.total.toLocaleString()}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}