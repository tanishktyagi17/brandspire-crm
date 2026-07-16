import { generateInvoicePDF } from "../../lib/pdfGenerator";

import {
  Save,
  Pencil,
  Printer,
  Download,
  Sparkles,
} from "lucide-react";

import { toast } from "sonner";
import { saveInvoice } from "../../lib/invoiceStorage";

export default function InvoiceActions({
  invoice,
  isEditMode,
}) {
  const handleSave = () => {
    saveInvoice(invoice);

    toast.success(
      isEditMode
        ? "Invoice updated successfully!"
        : "Invoice saved successfully!",
      {
        description: `Invoice ${invoice.invoiceNumber} has been ${
          isEditMode ? "updated" : "saved"
        }.`,
      }
    );
  };

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
      "AI Assist will be available in a future update."
    );
  };

  return (
    <div className="mt-10">

      <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-2xl p-5">

        <div className="flex flex-wrap justify-between items-center gap-5">

          {/* Left */}

          <div>

            <h3 className="text-xl font-bold text-slate-800">
              Ready to Finish?
            </h3>

            <p className="text-slate-500 mt-1">
              Save, print or export this invoice.
            </p>

          </div>

          {/* Right */}

          <div className="flex flex-wrap gap-3">

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

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              {isEditMode ? (
                <>
                  <Pencil size={18} />
                  Update Invoice
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Invoice
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}