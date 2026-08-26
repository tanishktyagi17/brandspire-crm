import { useState } from "react";
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

  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] =
    useState(false);

  /* ===========================================================
     SAVE / UPDATE
  =========================================================== */

  const handleSave = async () => {
    if (saving) return;

    try {
      setSaving(true);

      if (!invoice.customer) {
        toast.error(
          "Please select a customer before saving the invoice."
        );
        return;
      }

      if (
        !invoice.items ||
        invoice.items.length === 0
      ) {
        toast.error(
          "Please add at least one invoice item."
        );
        return;
      }

      const payload = {
        ...invoice,

        customer:
          typeof invoice.customer === "object"
            ? invoice.customer?._id
            : invoice.customer,

        issueDate: invoice.invoiceDate,

        tax: Number(invoice.gst || 0),

        discount: Number(
          invoice.discount || 0
        ),

        subtotal: Number(
          invoice.subtotal || 0
        ),

        discountAmount: Number(
          invoice.discountAmount || 0
        ),

        taxableAmount: Number(
          invoice.taxableAmount || 0
        ),

        gstAmount: Number(
          invoice.gstAmount || 0
        ),

        total: Number(
          invoice.total || 0
        ),

        items: invoice.items.map(
          (item) => ({
            description:
              item.description || "",

            quantity: Number(
              item.quantity || 0
            ),

            price: Number(
              item.price || 0
            ),
          })
        ),
      };

      /*
       * These fields belong to the frontend.
       * Backend uses issueDate and tax.
       */

      delete payload._id;
      delete payload.invoiceDate;
      delete payload.gst;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.__v;

      if (isEditMode) {
        if (!invoice._id) {
          throw new Error(
            "Invoice ID is missing."
          );
        }

        await updateInvoice(
          invoice._id,
          payload
        );

        toast.success(
          "Invoice updated successfully!"
        );
      } else {
        await createInvoice(payload);

        toast.success(
          "Invoice created successfully!"
        );
      }

      navigate("/invoices");
    } catch (error) {
      console.error(
        "Invoice Save Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to save invoice."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ===========================================================
     PRINT
  =========================================================== */

  const handlePrint = () => {
    try {
      window.print();
    } catch (error) {
      console.error(
        "Invoice Print Error:",
        error
      );

      toast.error(
        "Printing is not available on this device."
      );
    }
  };

  /* ===========================================================
     DOWNLOAD PDF
  =========================================================== */

  const handleDownload = async () => {
    if (downloading) return;

    try {
      setDownloading(true);

      /*
       * generateInvoicePDF will handle:
       *
       * Browser -> normal PDF download
       * Android -> native Capacitor save/share
       *
       * We will update pdfGenerator.js next.
       */

      await generateInvoicePDF(invoice);

      toast.success(
        "Invoice PDF generated successfully."
      );
    } catch (error) {
      console.error(
        "Invoice PDF Error:",
        error
      );

      toast.error(
        error.message ||
          "Failed to generate PDF."
      );
    } finally {
      setDownloading(false);
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

  /* ===========================================================
     UI
  =========================================================== */

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

            {/* Print */}

            <button
              type="button"
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

            {/* PDF */}

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
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
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Download size={18} />

              {downloading
                ? "Generating..."
                : "PDF"}
            </button>

            {/* AI */}

            <button
              type="button"
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

            {/* Save / Update */}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
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
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isEditMode ? (
                <>
                  <Pencil size={18} />

                  {saving
                    ? "Updating..."
                    : "Update"}
                </>
              ) : (
                <>
                  <Save size={18} />

                  {saving
                    ? "Saving..."
                    : "Save"}
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}