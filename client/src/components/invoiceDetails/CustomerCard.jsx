export default function CustomerCard({ invoice }) {
  return (
    <div className="grid xl:grid-cols-2 gap-6">

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Company Information
        </h2>

        <div className="space-y-2">

          <p className="font-semibold text-lg">
            Brandspire Technologies
          </p>

          <p className="text-gray-600">
            Kolkata, West Bengal
          </p>

          <p className="text-gray-600">
            support@brandspire.tech
          </p>

          <p className="text-gray-600">
            +91 9876543210
          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Customer Information
        </h2>

        <div className="space-y-2">

          <p>
            <span className="font-semibold">
              Name :
            </span>{" "}
            {invoice.customer?.name}
          </p>

          <p>
            <span className="font-semibold">
              Email :
            </span>{" "}
            {invoice.customer?.email}
          </p>

          <p>
            <span className="font-semibold">
              Phone :
            </span>{" "}
            {invoice.customer?.phone}
          </p>

          <p>
            <span className="font-semibold">
              Invoice Date :
            </span>{" "}
            {invoice.invoiceDate}
          </p>

          <p>
            <span className="font-semibold">
              Due Date :
            </span>{" "}
            {invoice.dueDate}
          </p>

          <p>
            <span className="font-semibold">
              Payment Terms :
            </span>{" "}
            {invoice.paymentTerms}
          </p>

        </div>

      </div>

    </div>
  );
}