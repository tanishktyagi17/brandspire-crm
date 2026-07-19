import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Website",
    value: 45,
  },
  {
    name: "Referral",
    value: 20,
  },
  {
    name: "Facebook",
    value: 15,
  },
  {
    name: "Instagram",
    value: 10,
  },
  {
    name: "Others",
    value: 10,
  },
];

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f97316",
  "#8b5cf6",
  "#ec4899",
];

export default function RevenuePieChart() {
  return (
    <div className="h-full rounded-3xl bg-white p-4 shadow-md sm:p-5 lg:p-6">

      {/* Header */}

      <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
        Revenue Sources
      </h2>

      <p className="mb-4 text-xs text-gray-500 sm:mb-6 sm:text-sm">
        Income generated from different channels.
      </p>

      {/* Chart */}

      <div className="h-56 sm:h-64 lg:h-72">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Legend */}

      <div className="mt-4 space-y-2 sm:space-y-3">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-2 sm:gap-3">

              <div
                className="h-3 w-3 rounded-full"
                style={{
                  background: COLORS[index],
                }}
              />

              <span className="text-sm text-slate-700 sm:text-base">
                {item.name}
              </span>

            </div>

            <span className="text-sm font-semibold sm:text-base">
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}