import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import RevenuePieChart from "../components/dashboard/RevenuePieChart";
import CustomerPieChart from "../components/dashboard/CustomerPieChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";

import { getDashboardStats } from "../services/dashboardService";

import {
  IndianRupee,
  Users,
  FileText,
  Clock3,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
    totalInvoices: 0,
    pendingRevenue: 0,
    paidInvoices: 0,
    pendingInvoices: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
      },
    },
  };

  return (
    <DashboardLayout>
      <motion.div
        className="space-y-6 lg:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}

        <motion.div variants={itemVariants}>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-2 text-base lg:text-lg text-slate-500">
            Welcome back 👋 Here's what's happening today.
          </p>
        </motion.div>

        {/* Stats */}

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-4 xl:grid-cols-4"
        >
          <StatCard
            title="Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            subtitle="Total Revenue"
            change={`${stats.paidInvoices} Paid`}
            color="bg-gradient-to-r from-blue-600 to-indigo-700"
            icon={<IndianRupee size={28} />}
          />

          <StatCard
            title="Customers"
            value={stats.totalCustomers}
            subtitle={`${stats.activeCustomers} Active`}
            change={`${stats.inactiveCustomers} Inactive`}
            color="bg-gradient-to-r from-emerald-500 to-green-600"
            icon={<Users size={28} />}
          />

          <StatCard
            title="Invoices"
            value={stats.totalInvoices}
            subtitle={`${stats.paidInvoices} Paid`}
            change={`${stats.pendingInvoices} Pending`}
            color="bg-gradient-to-r from-orange-500 to-red-500"
            icon={<FileText size={28} />}
          />

          <StatCard
            title="Pending Revenue"
            value={`₹${stats.pendingRevenue.toLocaleString()}`}
            subtitle="Awaiting Payment"
            change={`${stats.pendingInvoices} Invoices`}
            color="bg-gradient-to-r from-violet-600 to-pink-600"
            icon={<Clock3 size={28} />}
          />
        </motion.div>

        {/* Charts */}

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 xl:grid-cols-3 gap-6"
        >
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>

          <RevenuePieChart />
        </motion.div>

        {/* Bottom */}

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 xl:grid-cols-3 gap-6"
        >
          <CustomerPieChart />

          <RecentActivity />

          <QuickActions />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}