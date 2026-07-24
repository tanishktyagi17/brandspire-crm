import {
  CircleDot,
  PhoneCall,
  BadgeCheck,
  Trophy,
} from "lucide-react";

import LeadCard from "./LeadCard";

const stageStyles = {
  New: {
    gradient: "from-blue-600 to-cyan-500",
    icon: CircleDot,
  },

  Contacted: {
    gradient: "from-amber-500 to-orange-500",
    icon: PhoneCall,
  },

  Qualified: {
    gradient: "from-violet-600 to-fuchsia-500",
    icon: BadgeCheck,
  },

  Won: {
    gradient: "from-emerald-600 to-green-500",
    icon: Trophy,
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
  const Icon = style.icon;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">

      {/* Header */}

      <div
        className={`bg-gradient-to-r ${style.gradient} p-5 text-white`}
      >

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center">

              <Icon size={22} />

            </div>

            <div>

              <h2 className="font-bold text-lg">
                {title}
              </h2>

              <p className="text-sm text-white/80">
                ₹{formatCurrency(totalValue)}
              </p>

            </div>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
            {leads.length}
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="min-h-[620px] bg-slate-50 p-5 space-y-5">

        {leads.length === 0 ? (
          <div className="flex h-44 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white">

            <Icon
              size={34}
              className="text-slate-300 mb-3"
            />

            <p className="font-semibold text-slate-500">
              No Leads
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Leads in this stage will appear here.
            </p>

          </div>
        ) : (
          leads.map((lead) => (
  <LeadCard
    key={lead._id}
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