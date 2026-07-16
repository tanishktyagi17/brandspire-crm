import { useState } from "react";
import { toast } from "sonner";

import DashboardLayout from "../layouts/DashboardLayout";

import LeadStats from "../components/leads/LeadStats";
import LeadBoard from "../components/leads/LeadBoard";
import LeadToolbar from "../components/leads/LeadToolbar";
import AddLeadDialog from "../components/leads/AddLeadDialog";

import {
  addLead,
  updateLead,
  deleteLead,
} from "@/lib/leadStorage";

export default function Leads() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [stageFilter, setStageFilter] =
    useState("All");

  const [refreshKey, setRefreshKey] =
    useState(0);

  const [selectedLead, setSelectedLead] =
    useState(null);

  const [isEditMode, setIsEditMode] =
    useState(false);

  function refreshBoard() {
    setRefreshKey((prev) => prev + 1);
  }

  function handleAddLead(lead) {
    addLead(lead);

    toast.success("Lead added successfully.");

    refreshBoard();

    setDialogOpen(false);
  }

  function handleEditLead(lead) {
    setSelectedLead(lead);

    setIsEditMode(true);

    setDialogOpen(true);
  }

  function handleUpdateLead(lead) {
    updateLead(lead);

    toast.success("Lead updated successfully.");

    refreshBoard();

    setDialogOpen(false);

    setSelectedLead(null);

    setIsEditMode(false);
  }

  function handleDeleteLead(id) {
    deleteLead(id);

    toast.success("Lead deleted successfully.");

    refreshBoard();
  }

  function handleCloseDialog() {
    setDialogOpen(false);

    setSelectedLead(null);

    setIsEditMode(false);
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Lead Pipeline
          </h1>

          <p className="mt-2 text-slate-500">
            Manage and track every sales opportunity from one place.
          </p>
        </div>

        {/* Analytics */}
        <LeadStats key={refreshKey} />

        {/* Toolbar */}
        <LeadToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          stageFilter={stageFilter}
          setStageFilter={setStageFilter}
          onAddLead={() => {
            setSelectedLead(null);
            setIsEditMode(false);
            setDialogOpen(true);
          }}
        />

        {/* Kanban Board */}
        <LeadBoard
          refreshKey={refreshKey}
          searchTerm={searchTerm}
          stageFilter={stageFilter}
          onEdit={handleEditLead}
          onDelete={handleDeleteLead}
        />

        {/* Dialog */}
        <AddLeadDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          addLead={handleAddLead}
          updateLead={handleUpdateLead}
          selectedLead={selectedLead}
          isEditMode={isEditMode}
        />

      </div>
    </DashboardLayout>
  );
}