import { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import { getInvoices } from "../lib/invoiceStorage";

import InvoiceStats from "../components/invoices/InvoiceStats";
import InvoiceToolbar from "../components/invoices/InvoiceToolbar";
import InvoiceTable from "../components/invoices/InvoiceTable";

export default function Invoices() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const invoices = useMemo(() => {
    let data = [...getInvoices()];

    // Search
    if (search.trim()) {
      const value = search.toLowerCase();

      data = data.filter(
        (invoice) =>
          invoice.invoiceNumber
            ?.toLowerCase()
            .includes(value) ||
          invoice.customer?.name
            ?.toLowerCase()
            .includes(value)
      );
    }

    // Status Filter
    if (status !== "All") {
      data = data.filter(
        (invoice) => invoice.status === status
      );
    }

    // Sorting
    switch (sortBy) {
      case "Newest":
        data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
        break;

      case "Oldest":
        data.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );
        break;

      case "Highest":
        data.sort(
          (a, b) => b.total - a.total
        );
        break;

      case "Lowest":
        data.sort(
          (a, b) => a.total - b.total
        );
        break;

      default:
        break;
    }

    return data;
  }, [search, status, sortBy]);

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Invoice Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all customer invoices.
          </p>

        </div>

        <InvoiceStats invoices={invoices} />

        <InvoiceToolbar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <InvoiceTable invoices={invoices} />

      </div>

    </DashboardLayout>
  );
}