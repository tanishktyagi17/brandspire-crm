import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";

import {
  DollarSign,
  Users,
  UserPlus,
  CheckSquare,
} from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back 👋 Here's what's happening today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Revenue"
            value="₹4,25,000"
            subtitle="This Month"
            change="+18%"
            color="bg-gradient-to-r from-blue-600 to-indigo-700"
            icon={<DollarSign size={30} />}
          />

          <StatCard
            title="Customers"
            value="1,248"
            subtitle="Active Customers"
            change="+12%"
            color="bg-gradient-to-r from-emerald-500 to-green-600"
            icon={<Users size={30} />}
          />

          <StatCard
            title="Leads"
            value="327"
            subtitle="New Leads"
            change="+8%"
            color="bg-gradient-to-r from-orange-500 to-red-500"
            icon={<UserPlus size={30} />}
          />

          <StatCard
            title="Tasks"
            value="19"
            subtitle="Pending Tasks"
            change="-3%"
            color="bg-gradient-to-r from-purple-600 to-pink-600"
            icon={<CheckSquare size={30} />}
          />

        </div>

      </div>
    </DashboardLayout>
  );
}