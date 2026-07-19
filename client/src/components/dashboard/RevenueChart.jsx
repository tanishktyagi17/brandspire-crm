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
    <div className="rounded-3xl border bg-white p-4 shadow-xl sm:p-5 lg:p-6">

      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4 lg:mb-6">

        <div className="min-w-0 flex-1">

          <h2 className="text-lg font-bold text-slate-800 sm:text-xl lg:text-2xl">
            Revenue Overview
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm lg:text-base">
            Monthly revenue generated over the last 6 months.
          </p>

        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 sm:h-12 sm:w-12 lg:h-14 lg:w-14">
          <TrendingUp className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
        </div>

      </div>

      {/* Chart */}
      <div className="h-64 sm:h-72 lg:h-96">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) => `₹${value / 1000}k`}
              tick={{
                fill: "#64748b",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
              width={45}
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
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.08)",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#2563eb",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#1d4ed8",
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}