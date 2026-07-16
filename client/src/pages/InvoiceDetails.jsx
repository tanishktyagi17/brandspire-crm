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

        <div className="bg-white rounded-2xl shadow-sm border p-16 text-center">

          <h2 className="text-3xl font-bold">
            Invoice Not Found
          </h2>

          <p className="text-gray-500 mt-3">
            This invoice does not exist.
          </p>

          <button
            onClick={() => navigate("/invoices")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Back to Invoices
          </button>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <DetailsHeader invoice={invoice} />

        <CustomerCard invoice={invoice} />

        <ItemsTable items={invoice.items} />

        <SummaryCard invoice={invoice} />

        <ActionButtons invoice={invoice} />

      </div>

    </DashboardLayout>
  );
}