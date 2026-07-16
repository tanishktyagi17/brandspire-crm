import { getCustomers } from "./customerStorage";
import { getInvoices } from "./invoiceStorage";

/* ===================================================
   DASHBOARD STATS
=================================================== */

export function getDashboardStats() {
  const customers = getCustomers();
  const invoices = getInvoices();

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + Number(invoice.total || 0),
    0
  );

  const pendingRevenue = invoices
    .filter((invoice) => invoice.status !== "Paid")
    .reduce(
      (sum, invoice) => sum + Number(invoice.total || 0),
      0
    );

  return {
    totalCustomers: customers.length,

    activeCustomers,

    inactiveCustomers,

    totalInvoices: invoices.length,

    totalRevenue,

    pendingRevenue,
  };
}

/* ===================================================
   CUSTOMER PIE CHART
=================================================== */

export function getCustomerStatusData() {
  const customers = getCustomers();

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
}

/* ===================================================
   MONTHLY REVENUE CHART
=================================================== */

export function getRevenueChartData() {
  const invoices = getInvoices();

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

  const revenue = new Array(12).fill(0);

  invoices.forEach((invoice) => {
    if (!invoice.invoiceDate) return;

    const date = new Date(invoice.invoiceDate);

    const month = date.getMonth();

    revenue[month] += Number(invoice.total || 0);
  });

  return months.map((month, index) => ({
    month,
    revenue: revenue[index],
  }));
}

/* ===================================================
   RECENT ACTIVITY
=================================================== */

export function getRecentActivities() {
  const customers = getCustomers();

  return customers
    .slice(-5)
    .reverse()
    .map((customer) => ({
      id: customer.id,
      title: `${customer.name} was added`,
      time: customer.createdAt
        ? new Date(customer.createdAt).toLocaleDateString()
        : "Recently",
    }));
}