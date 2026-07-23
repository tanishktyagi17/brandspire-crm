import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import DashboardLayout from "../layouts/DashboardLayout";

import { getInvoice } from "../services/invoiceService";

import DetailsHeader from "../components/invoiceDetails/DetailsHeader";
import CustomerCard from "../components/invoiceDetails/CustomerCard";
import ItemsTable from "../components/invoiceDetails/ItemsTable";
import SummaryCard from "../components/invoiceDetails/SummaryCard";
import ActionButtons from "../components/invoiceDetails/ActionButtons";

export default function InvoiceDetails() {
  const { invoiceId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [invoice, setInvoice] = useState(null);

  /* ===========================================================
     LOAD INVOICE
  =========================================================== */

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);

        const response = await getInvoice(invoiceId);

        setInvoice(response.invoice);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load invoice."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  /* ===========================================================
     LOADING
  =========================================================== */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <h2 className="text-xl font-semibold text-slate-600">
            Loading Invoice...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  /* ===========================================================
     NOT FOUND
  =========================================================== */

  if (!invoice) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xl">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <span className="text-4xl">📄</span>
            </div>

            <h2 className="text-3xl font-bold text-slate-800">
              Invoice Not Found
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              The invoice you're looking for doesn't exist or may have been deleted.
            </p>

            <button
              onClick={() => navigate("/invoices")}
              className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              Back to Invoices
            </button>

          </div>

        </div>
      </DashboardLayout>
    );
  }

  /* ===========================================================
     UI
  =========================================================== */

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">

          <DetailsHeader invoice={invoice} />

          <CustomerCard invoice={invoice} />

          <ItemsTable items={invoice.items} />

          <SummaryCard invoice={invoice} />

          <ActionButtons invoice={invoice} />

        </div>

      </div>

    </DashboardLayout>
  );
}