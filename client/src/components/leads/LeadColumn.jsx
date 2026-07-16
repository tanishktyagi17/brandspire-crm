import LeadCard from "./LeadCard";

const stageStyles = {
  New: {
    header: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
  Contacted: {
    header: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  Qualified: {
    header: "bg-violet-500",
    badge: "bg-violet-100 text-violet-700",
  },
  Won: {
    header: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
};

export default function LeadColumn({
  title,
  leads,
  onEdit,
  onDelete,
}) {
  const totalValue = leads.reduce((sum, lead) => {
    const value = Number(
      String(lead.value).replace(/[^\d]/g, "")
    );

    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN").format(amount);

  const style = stageStyles[title];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className={`${style.header} p-5 text-white`}>

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-bold tracking-wide uppercase">
            {title}
          </h2>

          <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
            {leads.length}
          </span>

        </div>

        <p className="mt-3 text-sm text-white/80">
          ₹{formatCurrency(totalValue)}
        </p>

      </div>

      {/* Cards */}

      <div className="min-h-[600px] space-y-4 bg-slate-50 p-4">

        {leads.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 text-center text-sm text-slate-400">
            No Leads
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}

      </div>

    </div>
  );
}