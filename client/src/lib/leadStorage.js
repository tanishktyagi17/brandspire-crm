import { leadData } from "./leadData";

const STORAGE_KEY = "leads";

/**
 * Initialize default leads
 */
export function initializeLeads() {
  const existingLeads = localStorage.getItem(STORAGE_KEY);

  if (!existingLeads) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(leadData)
    );
  }
}

/**
 * Get all leads
 */
export function getLeads() {
  initializeLeads();

  try {
    const leads = localStorage.getItem(STORAGE_KEY);

    return leads ? JSON.parse(leads) : [];
  } catch (error) {
    console.error("Error loading leads:", error);
    return [];
  }
}

/**
 * Get lead by ID
 */
export function getLeadById(id) {
  return getLeads().find(
    (lead) => String(lead.id) === String(id)
  );
}

/**
 * Save all leads
 */
export function saveLeads(leads) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(leads)
  );
}

/**
 * Add lead
 */
export function addLead(lead) {
  const leads = getLeads();

  leads.push(lead);

  saveLeads(leads);

  return lead;
}

/**
 * Update lead
 */
export function updateLead(updatedLead) {
  const leads = getLeads();

  const updatedLeads = leads.map((lead) =>
    String(lead.id) === String(updatedLead.id)
      ? {
          ...lead,
          ...updatedLead,
        }
      : lead
  );

  saveLeads(updatedLeads);
}

/**
 * Delete lead
 */
export function deleteLead(id) {
  const filteredLeads = getLeads().filter(
    (lead) => String(lead.id) !== String(id)
  );

  saveLeads(filteredLeads);
}

/**
 * Clear all leads
 */
export function clearLeads() {
  localStorage.removeItem(STORAGE_KEY);
}