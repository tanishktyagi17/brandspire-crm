import {
  Users,
  IndianRupee,
  Trophy,
  TrendingUp,
} from "lucide-react";

import { getLeads } from "@/lib/leadStorage";
import StatCard from "@/components/dashboard/StatCard";

export default function LeadStats() {
  const leads = getLeads();

  const totalLeads = leads.length;

  const wonLeads = leads.filter(
    (lead) => lead.stage === "Won"
  ).length;

  const pipelineValue = leads.reduce((total, lead) => {
    const value = Number(
      String(lead.value).replace(/[^\d]/g, "")
    );

    return total + (isNaN(value) ? 0 : value);
  }, 0);

  const conversion =
    totalLeads === 0
      ? 0
      : Math.round((wonLeads / totalLeads) * 100);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
      <StatCard
        title="Total Leads"
        value={totalLeads}
        subtitle="Active Pipeline"
        change="+12%"
        color="bg-gradient-to-r from-blue-600 to-cyan-500"
        icon={<Users size={28} />}
      />

      <StatCard
        title="Pipeline Value"
        value={`₹${formatCurrency(pipelineValue)}`}
        subtitle="Estimated Revenue"
        change="+18%"
        color="bg-gradient-to-r from-emerald-600 to-green-500"
        icon={<IndianRupee size={28} />}
      />

      <StatCard
        title="Won Deals"
        value={wonLeads}
        subtitle="Successfully Closed"
        change="+7%"
        color="bg-gradient-to-r from-orange-500 to-amber-500"
        icon={<Trophy size={28} />}
      />

      <StatCard
        title="Conversion"
        value={`${conversion}%`}
        subtitle="Lead Success Rate"
        change="+3%"
        color="bg-gradient-to-r from-violet-600 to-fuchsia-500"
        icon={<TrendingUp size={28} />}
      />
    </div>
  );
}