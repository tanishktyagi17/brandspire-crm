import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { TrendingUp } from "lucide-react";

import { getRevenueData } from "../../lib/dashboardData";

const revenueData = getRevenueData();

export default function RevenueChart() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Revenue Overview
          </h2>

          <p className="mt-1 text-slate-500">
            Monthly revenue generated over the last 6 months.
          </p>
        </div>

        <div className="rounded-2xl bg-blue-100 p-3">
          <TrendingUp className="h-7 w-7 text-blue-600" />
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) => `₹${value / 1000}k`}
              tick={{ fill: "#64748b", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
              labelStyle={{
                color: "#1e293b",
                fontWeight: 600,
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#2563eb",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                fill: "#1d4ed8",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}