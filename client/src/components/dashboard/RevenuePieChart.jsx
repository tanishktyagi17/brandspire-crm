import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Website", value: 45 },
  { name: "Referral", value: 20 },
  { name: "Facebook", value: 15 },
  { name: "Instagram", value: 10 },
  { name: "Others", value: 10 },
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
    <div className="h-full rounded-2xl lg:rounded-3xl bg-white border shadow-xl p-4 lg:p-6">

      {/* Header */}

      <h2 className="text-lg lg:text-2xl font-bold text-slate-800">
        Revenue Sources
      </h2>

      <p className="mt-1 text-xs lg:text-base text-slate-500">
        Income generated from different channels.
      </p>

      {/* Chart */}

      <div className="mt-4 h-52 sm:h-60 lg:h-72">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={40}
              outerRadius={70}
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
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-sm lg:text-base text-slate-700">
                {item.name}
              </span>

            </div>

            <span className="text-sm lg:text-base font-semibold">
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}