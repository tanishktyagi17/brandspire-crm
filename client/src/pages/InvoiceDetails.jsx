import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { getInvoiceById } from "../lib/invoiceStorage";

import DetailsHeader from "../components/invoiceDetails/DetailsHeader";
import CustomerCard from "../components/invoiceDetails/CustomerCard";
import ItemsTable from "../components/invoiceDetails/ItemsTable";
import SummaryCard from "../components/invoiceDetails/SummaryCard";
import ActionButtons from "../components/invoiceDetails/ActionButtons";

export default function InvoiceDetails() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const invoice = useMemo(() => {
    return getInvoiceById(invoiceId);
  }, [invoiceId]);

  if (!invoice) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xl">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <span className="text-4xl">📄</span>
            </div>

            <h2 className="text-3xl font-bold text-slate-800">
              Invoice Not Found
            </h2>

            <p className="mt-3 text-slate-500 leading-7">
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

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">

          {/* Header */}
          <DetailsHeader invoice={invoice} />

          {/* Customer Information */}
          <CustomerCard invoice={invoice} />

          {/* Items */}
          <ItemsTable items={invoice.items} />

          {/* Summary */}
          <SummaryCard invoice={invoice} />

          {/* Actions */}
          <ActionButtons invoice={invoice} />

        </div>

      </div>
    </DashboardLayout>
  );
}