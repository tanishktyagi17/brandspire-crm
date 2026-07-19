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
      title: "Revenue",
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
      color: "bg-violet-100 text-violet-700",
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

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              bg-white
              p-4
              shadow-sm
              transition
              hover:-translate-y-1
              hover:shadow-lg
              lg:p-6
            "
          >
            <div className="flex items-start justify-between">

              <div className="min-w-0">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm">
                  {card.title}
                </p>

                <h2 className="mt-2 break-words text-lg font-bold text-slate-800 sm:text-2xl lg:text-3xl">
                  {card.value}
                </h2>

              </div>

              <div
                className={`ml-3 flex h-12 w-12 items-center justify-center rounded-xl ${card.color} lg:h-14 lg:w-14`}
              >
                <Icon size={22} className="lg:h-7 lg:w-7" />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}