import { useNavigate } from "react-router-dom";

import { generateInvoicePDF } from "../../lib/pdfGenerator";

import {
  Save,
  Pencil,
  Printer,
  Download,
  Sparkles,
} from "lucide-react";

import { toast } from "sonner";

import {
  createInvoice,
  updateInvoice,
} from "../../services/invoiceService";

export default function InvoiceActions({
  invoice,
  isEditMode,
}) {
  const navigate = useNavigate();

  /* ===========================================================
     SAVE / UPDATE
  =========================================================== */

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await updateInvoice(invoice._id, invoice);

        toast.success(
          "Invoice updated successfully!"
        );
      } else {
        await createInvoice(invoice);

        toast.success(
          "Invoice created successfully!"
        );
      }

      navigate("/invoices");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save invoice."
      );
    }
  };

  /* ===========================================================
     PRINT
  =========================================================== */

  const handlePrint = () => {
    window.print();
  };

  /* ===========================================================
     DOWNLOAD PDF
  =========================================================== */

  const handleDownload = () => {
    try {
      generateInvoicePDF(invoice);

      toast.success(
        "Invoice downloaded successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to generate PDF."
      );
    }
  };

  /* ===========================================================
     AI
  =========================================================== */

  const handleAI = () => {
    toast.info(
      "AI Assist will be available in a future update."
    );
  };

  return (
    <div className="mt-10">

      <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-2xl backdrop-blur-xl md:p-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div>

            <h3 className="text-xl font-bold text-slate-800 md:text-2xl">
              Ready to Finish?
            </h3>

            <p className="mt-1 text-sm text-slate-500 md:text-base">
              Save, print or export this invoice.
            </p>

          </div>

          {/* Right */}

          <div className="grid w-full grid-cols-2 gap-3 lg:flex lg:w-auto lg:flex-wrap">

            <button
              onClick={handlePrint}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                font-medium
                text-slate-700
                transition
                hover:bg-slate-100
              "
            >
              <Printer size={18} />
              Print
            </button>

            <button
              onClick={handleDownload}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                font-medium
                text-slate-700
                transition
                hover:bg-slate-100
              "
            >
              <Download size={18} />
              PDF
            </button>

            <button
              onClick={handleAI}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-violet-600
                to-fuchsia-600
                px-4
                py-3
                font-semibold
                text-white
                shadow-lg
                transition
                hover:scale-105
              "
            >
              <Sparkles size={18} />
              AI Assist
            </button>

            <button
              onClick={handleSave}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-600
                px-4
                py-3
                font-semibold
                text-white
                shadow-lg
                transition
                hover:scale-105
              "
            >
              {isEditMode ? (
                <>
                  <Pencil size={18} />
                  Update
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}