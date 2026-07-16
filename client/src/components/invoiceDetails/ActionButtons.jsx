import { Download, Pencil, Printer, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ActionButtons({ invoice }) {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(
      "PDF Download will be implemented in the next step."
    );
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <div className="flex flex-wrap gap-4 justify-end">

        <button
          onClick={() => navigate("/invoices")}
          className="px-5 py-3 rounded-xl border flex items-center gap-2 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-900 flex items-center gap-2"
        >
          <Printer size={18} />
          Print
        </button>

        <button
          onClick={handleDownload}
          className="px-5 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
        >
          <Download size={18} />
          Download PDF
        </button>

        <Link
          to={`/invoice/edit/${invoice.id}`}
          className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
        >
          <Pencil size={18} />
          Edit Invoice
        </Link>

      </div>

    </div>
  );
}