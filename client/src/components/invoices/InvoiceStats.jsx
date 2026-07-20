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
    (sum, invoice) => sum + (invoice.total || 0),
    0
  );

  const stats = [
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
      growth: "-3%",
      icon: AlertTriangle,
      bg: "from-red-500 to-rose-600",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      growth: "+24%",
      icon: IndianRupee,
      bg: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 gap-6">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className={`bg-gradient-to-r ${item.bg} rounded-3xl p-6 text-white shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="flex justify-between items-start">

              <div>

                <p className="text-sm opacity-90">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold mt-2 break-words">
                  {item.value}
                </h2>

                <p className="mt-5 text-sm opacity-80">
                  Growth
                </p>

                <span className="inline-block mt-1 rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                  {item.growth}
                </span>

              </div>

              <div className="rounded-2xl bg-white/20 p-4">

                <Icon size={34} />

              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}