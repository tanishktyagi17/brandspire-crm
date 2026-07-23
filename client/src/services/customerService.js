import api from "./api";

/* ===========================================================
   AUTH HEADER
=========================================================== */

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* ===========================================================
   NORMALIZE CUSTOMER
=========================================================== */

const normalizeCustomer = (customer) => ({
  ...customer,
  id: customer._id,
});

/* ===========================================================
   GET ALL CUSTOMERS
=========================================================== */

export const getCustomers = async () => {
  const response = await api.get(
    "/customers",
    getConfig()
  );

  return {
    ...response.data,
    customers: response.data.customers.map(normalizeCustomer),
  };
};

/* ===========================================================
   GET SINGLE CUSTOMER
=========================================================== */

export const getCustomer = async (id) => {
  const response = await api.get(
    `/customers/${id}`,
    getConfig()
  );

  return {
    ...response.data,
    customer: normalizeCustomer(response.data.customer),
  };
};

/* ===========================================================
   CREATE CUSTOMER
=========================================================== */

export const createCustomer = async (customer) => {
  const response = await api.post(
    "/customers",
    customer,
    getConfig()
  );

  return {
    ...response.data,
    customer: normalizeCustomer(response.data.customer),
  };
};

/* ===========================================================
   UPDATE CUSTOMER
=========================================================== */

export const updateCustomer = async (id, customer) => {
  const response = await api.put(
    `/customers/${id}`,
    customer,
    getConfig()
  );

  return {
    ...response.data,
    customer: normalizeCustomer(response.data.customer),
  };
};

/* ===========================================================
   DELETE CUSTOMER
=========================================================== */

export const deleteCustomer = async (id) => {
  const response = await api.delete(
    `/customers/${id}`,
    getConfig()
  );

  return response.data;
};