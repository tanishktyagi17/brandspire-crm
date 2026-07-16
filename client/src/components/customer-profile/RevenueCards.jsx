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
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl border shadow-sm p-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}
            >
              <card.icon size={28} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}