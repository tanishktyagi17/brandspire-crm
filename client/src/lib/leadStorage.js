import { leadData } from "./leadData";

const STORAGE_KEY = "leads";

/*
|--------------------------------------------------------------------------
| Initialize Leads
|--------------------------------------------------------------------------
*/

export function initializeLeads() {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);

    if (!existing) {
      const defaultLeads = leadData.map((lead) => ({
        ...lead,
        id: lead.id || Date.now() + Math.random(),
        createdAt:
          lead.createdAt || new Date().toISOString(),
      }));

      saveLeads(defaultLeads);
    }
  } catch (error) {
    console.error("Error initializing leads:", error);
  }
}

/*
|--------------------------------------------------------------------------
| Get Leads
|--------------------------------------------------------------------------
*/

export function getLeads() {
  initializeLeads();

  try {
    const leads = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );

    return Array.isArray(leads) ? leads : [];
  } catch (error) {
    console.error("Error loading leads:", error);
    return [];
  }
}

/*
|--------------------------------------------------------------------------
| Get Lead By ID
|--------------------------------------------------------------------------
*/

export function getLeadById(id) {
  return getLeads().find(
    (lead) => String(lead.id) === String(id)
  );
}

/*
|--------------------------------------------------------------------------
| Save Leads
|--------------------------------------------------------------------------
*/

export function saveLeads(leads) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(leads)
  );
}

/*
|--------------------------------------------------------------------------
| Add Lead
|--------------------------------------------------------------------------
*/

export function addLead(lead) {
  const leads = getLeads();

  const newLead = {
    ...lead,
    id: lead.id || Date.now(),
    createdAt:
      lead.createdAt || new Date().toISOString(),
  };

  leads.unshift(newLead);

  saveLeads(leads);

  return newLead;
}

/*
|--------------------------------------------------------------------------
| Update Lead
|--------------------------------------------------------------------------
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

  return updatedLead;
}

/*
|--------------------------------------------------------------------------
| Delete Lead
|--------------------------------------------------------------------------
*/

export function deleteLead(id) {
  const filteredLeads = getLeads().filter(
    (lead) => String(lead.id) !== String(id)
  );

  saveLeads(filteredLeads);
}

/*
|--------------------------------------------------------------------------
| Clear Leads
|--------------------------------------------------------------------------
*/

export function clearLeads() {
  localStorage.removeItem(STORAGE_KEY);
}