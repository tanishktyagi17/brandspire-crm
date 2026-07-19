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
    <div className="rounded-3xl border bg-white p-4 shadow-xl sm:p-5 lg:p-6">

      {/* Header */}

      <h2 className="text-lg font-bold text-slate-800 sm:text-xl lg:text-2xl">
        Customer Status
      </h2>

      <p className="mt-1 mb-4 text-xs text-slate-500 sm:mb-5 sm:text-sm lg:mb-6 lg:text-base">
        Distribution of customer categories.
      </p>

      {/* Chart */}

      <div className="h-56 sm:h-64 lg:h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={customerStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={window.innerWidth < 640 ? 70 : 100}
              label={({ percent }) =>
                `${(percent * 100).toFixed(0)}%`
              }
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

      {/* Legend */}

      <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-5">

        {customerStatusData.map((item, index) => (

          <div
            key={item.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-2">

              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[index % COLORS.length],
                }}
              />

              <span className="text-sm text-slate-700">
                {item.name}
              </span>

            </div>

            <span className="text-sm font-semibold text-slate-700">
              {item.value}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}