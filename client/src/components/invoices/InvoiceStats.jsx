import {
  FileText,
  BadgeCheck,
  Clock3,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";

export default function InvoiceStats({ invoices }) {
  const totalInvoices = invoices.length;

  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "Paid"
  );

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending"
  );

  const overdueInvoices = invoices.filter(
    (invoice) => invoice.status === "Overdue"
  );

  const totalRevenue = paidInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.total || 0),
    0
  );

  const cards = [
    {
      title: "Total Invoices",
      value: totalInvoices,
      growth: "+12%",
      icon: FileText,
      bg: "from-blue-500 to-indigo-600",
    },
    {
      title: "Paid",
      value: paidInvoices.length,
      growth: "+18%",
      icon: BadgeCheck,
      bg: "from-green-500 to-emerald-600",
    },
    {
      title: "Pending",
      value: pendingInvoices.length,
      growth: "+5%",
      icon: Clock3,
      bg: "from-yellow-500 to-orange-500",
    },
    {
      title: "Overdue",
      value: overdueInvoices.length,
      growth: "-2%",
      icon: AlertTriangle,
      bg: "from-red-500 to-pink-600",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      growth: "+20%",
      icon: IndianRupee,
      bg: "from-violet-500 to-fuchsia-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-5 gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className={`bg-gradient-to-r ${card.bg} rounded-3xl p-4 md:p-6 text-white shadow-xl hover:scale-105 transition duration-300`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm opacity-80">
                  {card.title}
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mt-2 break-words">
                  {card.value}
                </h2>

                <p className="mt-5 text-sm opacity-90">
                  Growth
                </p>

                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mt-1">
                  {card.growth}
                </span>
              </div>

              <div className="bg-white/20 p-3 md:p-4 rounded-2xl ml-3">
                <Icon size={30} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}