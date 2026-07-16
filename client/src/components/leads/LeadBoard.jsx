import { useEffect, useState } from "react";

import { getLeads } from "@/lib/leadStorage";

import LeadColumn from "./LeadColumn";

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
    setLeads(getLeads());
  }, [refreshKey]);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lead.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStage =
      stageFilter === "All" ||
      lead.stage === stageFilter;

    return matchesSearch && matchesStage;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-4">
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
  );
}