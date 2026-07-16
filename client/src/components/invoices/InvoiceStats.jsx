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
    (sum, invoice) => sum + invoice.total,
    0
  );

  const cards = [
    {
      title: "Total Invoices",
      value: totalInvoices,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Paid",
      value: paidInvoices.length,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Pending",
      value: pendingInvoices.length,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      title: "Overdue",
      value: overdueInvoices.length,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl border shadow-sm p-6 ${card.bg}`}
        >
          <p className="text-gray-500 text-sm">
            {card.title}
          </p>

          <h2
            className={`text-3xl font-bold mt-3 ${card.color}`}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}