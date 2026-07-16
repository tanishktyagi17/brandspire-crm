import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getCustomerStatusData } from "../../lib/dashboardData";

const customerStatusData = getCustomerStatusData();

const COLORS = [
  "#10b981",
  "#ef4444",
  "#f59e0b",
];

export default function CustomerPieChart() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-slate-800">
        Customer Status
      </h2>

      <p className="text-slate-500 mt-1 mb-6">
        Distribution of customer categories.
      </p>

      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={customerStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {customerStatusData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}