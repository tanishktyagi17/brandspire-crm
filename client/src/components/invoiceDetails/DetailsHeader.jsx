import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetailsHeader({ invoice }) {
  const navigate = useNavigate();

  const badgeColors = {
    Draft: "bg-gray-100 text-gray-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Paid: "bg-green-100 text-green-700",
    Overdue: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/invoices")}
            className="p-3 rounded-xl border hover:bg-slate-100 transition"
          >
            <ArrowLeft size={20} />
          </button>

          <div>

            <p className="text-gray-500">
              Invoice Number
            </p>

            <h1 className="text-3xl font-bold">
              {invoice.invoiceNumber}
            </h1>

          </div>

        </div>

        <div className="flex items-center gap-4">

          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              badgeColors[invoice.status]
            }`}
          >
            {invoice.status}
          </span>

        </div>

      </div>

    </div>
  );
}