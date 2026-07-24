import { useEffect, useState } from "react";

import { getLeads } from "../../services/leadService";

import LeadColumn from "./LeadColumn";

import { toast } from "sonner";

export default function LeadBoard({
  refreshKey,
  searchTerm,
  stageFilter,
  onEdit,
  onDelete,
}) {
  const [leads, setLeads] = useState([]);

  const stages = [
    "New",
    "Contacted",
    "Qualified",
    "Won",
  ];

  useEffect(() => {
    async function loadLeads() {
      try {
        const response = await getLeads();

        setLeads(response.leads || []);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load leads.");
      }
    }

    loadLeads();
  }, [refreshKey]);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (lead.company || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStage =
      stageFilter === "All" ||
      lead.stage === stageFilter;

    return matchesSearch && matchesStage;
  });

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

      <div className="grid gap-6 xl:grid-cols-4">

        {stages.map((stage) => (
          <LeadColumn
            key={stage}
            title={stage}
            leads={filteredLeads.filter(
              (lead) => lead.stage === stage
            )}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

      </div>

    </div>
  );
}