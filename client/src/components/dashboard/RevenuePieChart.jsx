import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { getInvoiceStatusData } from "../../services/dashboardService";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#64748b",
];

export default function RevenuePieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getInvoiceStatusData();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="h-full rounded-2xl lg:rounded-3xl bg-white border shadow-xl p-4 lg:p-6">

      {/* Header */}

      <h2 className="text-lg lg:text-2xl font-bold text-slate-800">
        Invoice Status
      </h2>

      <p className="mt-1 text-xs lg:text-base text-slate-500">
        Distribution of invoice statuses.
      </p>

      {/* Chart */}

      <div className="mt-4 h-52 sm:h-60 lg:h-72">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
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

      <div className="mt-4 space-y-2 lg:space-y-3">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-2 lg:gap-3">

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

            <span className="text-sm lg:text-base font-semibold">
              {item.value}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}