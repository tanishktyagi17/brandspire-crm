import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import DashboardLayout from "../layouts/DashboardLayout";

import { getInvoices } from "../services/invoiceService";

import InvoiceStats from "../components/invoices/InvoiceStats";
import InvoiceToolbar from "../components/invoices/InvoiceToolbar";
import InvoiceTable from "../components/invoices/InvoiceTable";

export default function Invoices() {
  const [loading, setLoading] = useState(true);

  const [allInvoices, setAllInvoices] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  /* ===========================================================
     LOAD INVOICES
  =========================================================== */

  const fetchInvoices = async () => {
    try {
      setLoading(true);

      const response = await getInvoices();

      setAllInvoices(response.invoices || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load invoices."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  /* ===========================================================
     SEARCH + FILTER + SORT
  =========================================================== */

  const invoices = useMemo(() => {
    let data = [...allInvoices];

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

    if (status !== "All") {
      data = data.filter(
        (invoice) => invoice.status === status
      );
    }

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
  }, [allInvoices, search, status, sortBy]);

  /* ===========================================================
     DELETE CALLBACK
  =========================================================== */

  const handleDelete = (id) => {
    setAllInvoices((prev) =>
      prev.filter(
        (invoice) => invoice._id !== id
      )
    );
  };

  /* ===========================================================
     LOADING
  =========================================================== */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <h2 className="text-xl font-semibold text-slate-600">
            Loading Invoices...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  /* ===========================================================
     UI
  =========================================================== */

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Invoice Management
          </h1>

          <p className="mt-1 text-gray-500">
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

        <InvoiceTable
          invoices={invoices}
          onDelete={handleDelete}
        />

      </div>

    </DashboardLayout>
  );
}