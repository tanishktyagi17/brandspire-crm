import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getCustomerStatusData } from "../../services/dashboardService";

const COLORS = [
  "#10b981",
  "#ef4444",
  "#f59e0b",
];

export default function CustomerPieChart() {
  const [customerStatusData, setCustomerStatusData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getCustomerStatusData();
        setCustomerStatusData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="rounded-2xl lg:rounded-3xl border bg-white shadow-xl p-4 lg:p-6">

      {/* Header */}

      <h2 className="text-lg lg:text-2xl font-bold text-slate-800">
        Customer Status
      </h2>

      <p className="mt-1 text-xs lg:text-base text-slate-500">
        Distribution of customer categories.
      </p>

      {/* Chart */}

      <div className="mt-4 h-52 sm:h-60 lg:h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={customerStatusData}
              dataKey="value"
              nameKey="name"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={3}
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

      <div className="mt-4 space-y-2">

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

              <span className="text-sm lg:text-base text-slate-700">
                {item.name}
              </span>

            </div>

            <span className="text-sm lg:text-base font-semibold text-slate-700">
              {item.value}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}