import api from "./api";

/* ===========================================================
   GET ALL INVOICES
=========================================================== */

export const getInvoices = async () => {
  const response = await api.get("/invoices");
  return response.data;
};

/* ===========================================================
   GET SINGLE INVOICE
=========================================================== */

export const getInvoice = async (id) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
};

/* ===========================================================
   CREATE INVOICE
=========================================================== */

export const createInvoice = async (invoiceData) => {
  const response = await api.post(
    "/invoices",
    invoiceData
  );

  return response.data;
};

/* ===========================================================
   UPDATE INVOICE
=========================================================== */

export const updateInvoice = async (
  id,
  invoiceData
) => {
  const response = await api.put(
    `/invoices/${id}`,
    invoiceData
  );

  return response.data;
};

/* ===========================================================
   DELETE INVOICE
=========================================================== */

export const deleteInvoice = async (id) => {
  const response = await api.delete(
    `/invoices/${id}`
  );

  return response.data;
};