import DashboardLayout from "../layouts/DashboardLayout";
import { motion } from "framer-motion";

import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import RevenuePieChart from "../components/dashboard/RevenuePieChart";
import CustomerPieChart from "../components/dashboard/CustomerPieChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";

import {
  IndianRupee,
  Users,
  FileText,
  Clock3,
} from "lucide-react";

import { getDashboardStats } from "../lib/dashboardData";

export default function Dashboard() {
  const stats = getDashboardStats();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
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
        duration: 0.4,
      },
    },
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 lg:space-y-8"
      >
        {/* Header */}

        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl lg:text-4xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:mt-2 sm:text-base">
            Welcome back 👋 Here's what's happening today.
          </p>
        </motion.div>

        {/* Stats */}

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-6"
        >
          <StatCard
            title="Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            subtitle="Total Revenue"
            change={`${stats.paidInvoices} Paid`}
            color="bg-gradient-to-r from-blue-600 to-indigo-700"
            icon={<IndianRupee size={30} />}
          />

          <StatCard
            title="Customers"
            value={stats.totalCustomers}
            subtitle={`${stats.activeCustomers} Active`}
            change={`${stats.inactiveCustomers} Inactive`}
            color="bg-gradient-to-r from-emerald-500 to-green-600"
            icon={<Users size={30} />}
          />

          <StatCard
            title="Invoices"
            value={stats.totalInvoices}
            subtitle={`${stats.paidInvoices} Paid`}
            change={`${stats.pendingInvoices} Pending`}
            color="bg-gradient-to-r from-orange-500 to-red-500"
            icon={<FileText size={30} />}
          />

          <StatCard
            title="Pending Revenue"
            value={`₹${stats.pendingRevenue.toLocaleString()}`}
            subtitle="Awaiting Payment"
            change={`${stats.pendingInvoices} Invoices`}
            color="bg-gradient-to-r from-violet-600 to-pink-600"
            icon={<Clock3 size={30} />}
          />
        </motion.div>

        {/* Charts */}

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-4 lg:gap-6 xl:grid-cols-3"
        >
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>

          <RevenuePieChart />
        </motion.div>

        {/* Bottom Section */}

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-4 lg:gap-6 xl:grid-cols-3"
        >
          <CustomerPieChart />

          <RecentActivity />

          <QuickActions />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}