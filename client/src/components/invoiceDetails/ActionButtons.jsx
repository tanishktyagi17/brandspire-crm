import { generateInvoicePDF } from "../../lib/pdfGenerator";

import {
  ArrowLeft,
  Download,
  Pencil,
  Printer,
  Sparkles,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ActionButtons({ invoice }) {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    try {
      generateInvoicePDF(invoice);

      toast.success("Invoice downloaded successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to generate PDF.");
    }
  };

  const handleAI = () => {
    toast.info(
      "AI Invoice Analysis will be available in a future update."
    );
  };

  return (
    <div className="mt-8">

      <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-2xl p-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Left */}

          <div>

            <h3 className="text-2xl font-bold text-slate-800">
              Invoice Actions
            </h3>

            <p className="mt-1 text-slate-500">
              Print, export or edit this invoice.
            </p>

          </div>

          {/* Right */}

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => navigate("/invoices")}
              className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <Printer size={18} />
              Print
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <Download size={18} />
              PDF
            </button>

            <button
              onClick={handleAI}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <Sparkles size={18} />
              AI Assist
            </button>

            <Link
              to={`/invoice/edit/${invoice.id}`}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <Pencil size={18} />
              Edit Invoice
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}