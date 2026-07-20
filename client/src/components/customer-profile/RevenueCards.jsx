import {
  IndianRupee,
  FileText,
  FolderKanban,
  Clock3,
} from "lucide-react";

import { getInvoices } from "../../lib/invoiceStorage";

export default function RevenueCards({ customerId }) {
  const invoices = getInvoices().filter(
    (invoice) =>
      String(invoice.customerId) === String(customerId)
  );

  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + (invoice.total || 0),
    0
  );

  const totalInvoices = invoices.length;

  const activeProjects = new Set(
    invoices.map((invoice) => invoice.project)
  ).size;

  const pendingAmount = invoices
    .filter((invoice) => invoice.status !== "Paid")
    .reduce(
      (sum, invoice) => sum + (invoice.total || 0),
      0
    );

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Invoices",
      value: totalInvoices,
      icon: FileText,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Projects",
      value: activeProjects,
      icon: FolderKanban,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Pending",
      value: `₹${pendingAmount.toLocaleString()}`,
      icon: Clock3,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5 lg:p-6"
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500 sm:text-sm">
                {card.title}
              </p>

              <h2 className="mt-2 break-words text-xl font-bold text-slate-800 sm:text-2xl lg:text-3xl">
                {card.value}
              </h2>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12 lg:h-14 lg:w-14 ${card.color}`}
            >
              <card.icon
                size={20}
                className="sm:h-6 sm:w-6 lg:h-7 lg:w-7"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}