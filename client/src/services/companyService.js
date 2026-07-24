import api from "./api";

/* ===========================================================
   GET COMPANY SETTINGS
=========================================================== */

export const getCompany = async () => {
  const { data } = await api.get("/company");
  return data;
};

/* ===========================================================
   UPDATE COMPANY SETTINGS
=========================================================== */

export const updateCompany = async (company) => {
  const { data } = await api.put("/company", company);
  return data;
};