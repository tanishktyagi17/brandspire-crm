import api from "./api";

/* ==========================================
   Dashboard Statistics
========================================== */

export const getDashboardStats = async () => {
  const [customersRes, invoicesRes] = await Promise.all([
    api.get("/customers"),
    api.get("/invoices"),
  ]);

  const customers = customersRes.data.customers || [];
  const invoices = invoicesRes.data.invoices || [];

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const totalInvoices = invoices.length;

  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "Paid"
  );

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status !== "Paid"
  );

  const totalRevenue = paidInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.total || 0),
    0
  );

  const pendingRevenue = pendingInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.total || 0),
    0
  );

  return {
    totalCustomers,
    activeCustomers,
    inactiveCustomers,

    totalInvoices,

    totalRevenue,
    pendingRevenue,

    paidInvoices: paidInvoices.length,
    pendingInvoices: pendingInvoices.length,
  };
};

/* ==========================================
   Customer Pie Chart
========================================== */

export const getCustomerStatusData = async () => {
  const { data } = await api.get("/customers");

  const customers = data.customers || [];

  return [
    {
      name: "Active",
      value: customers.filter(
        (customer) => customer.status === "Active"
      ).length,
    },
    {
      name: "Inactive",
      value: customers.filter(
        (customer) => customer.status === "Inactive"
      ).length,
    },
  ];
};

/* ==========================================
   Invoice Status Pie
========================================== */

export const getInvoiceStatusData = async () => {
  const { data } = await api.get("/invoices");

  const invoices = data.invoices || [];

  return [
    {
      name: "Paid",
      value: invoices.filter(
        (invoice) => invoice.status === "Paid"
      ).length,
    },
    {
      name: "Pending",
      value: invoices.filter(
        (invoice) => invoice.status === "Pending"
      ).length,
    },
    {
      name: "Draft",
      value: invoices.filter(
        (invoice) => invoice.status === "Draft"
      ).length,
    },
  ];
};

/* ==========================================
   Revenue Chart
========================================== */

export const getRevenueData = async () => {
  const { data } = await api.get("/invoices");

  const invoices = data.invoices || [];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenue = {};

  months.forEach((month) => {
    revenue[month] = 0;
  });

  invoices.forEach((invoice) => {
    if (!invoice.invoiceDate) return;

    const date = new Date(invoice.invoiceDate);

    const month = months[date.getMonth()];

    revenue[month] += Number(invoice.total || 0);
  });

  return months.map((month) => ({
    month,
    revenue: revenue[month],
  }));
};

/* ==========================================
   Recent Activity
========================================== */

export const getRecentActivities = async () => {
  const { data } = await api.get("/customers");

  const customers = data.customers || [];

  return customers
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 6)
    .map((customer) => ({
      id: customer._id,
      title: `${customer.name} was added`,
      time: new Date(customer.createdAt).toLocaleDateString(),
    }));
};