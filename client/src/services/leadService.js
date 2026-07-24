import api from "./api";

/* ===========================================================
   GET ALL LEADS
=========================================================== */

export const getLeads = async () => {
  const token = localStorage.getItem("token");

  const { data } = await api.get("/leads", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

/* ===========================================================
   GET SINGLE LEAD
=========================================================== */

export const getLead = async (id) => {
  const token = localStorage.getItem("token");

  const { data } = await api.get(`/leads/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

/* ===========================================================
   CREATE LEAD
=========================================================== */

export const createLead = async (leadData) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post("/leads", leadData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

/* ===========================================================
   UPDATE LEAD
=========================================================== */

export const updateLead = async (id, leadData) => {
  const token = localStorage.getItem("token");

  const { data } = await api.put(`/leads/${id}`, leadData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

/* ===========================================================
   DELETE LEAD
=========================================================== */

export const deleteLead = async (id) => {
  const token = localStorage.getItem("token");

  const { data } = await api.delete(`/leads/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};