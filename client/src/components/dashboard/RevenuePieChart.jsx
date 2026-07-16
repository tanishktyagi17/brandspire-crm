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
    <div className="bg-white rounded-3xl shadow-md p-6 h-full">

      <h2 className="text-xl font-bold text-slate-800">
        Revenue Sources
      </h2>

      <p className="text-gray-500 mb-6">
        Income generated from different channels.
      </p>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
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

      <div className="space-y-3 mt-2">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="flex justify-between items-center"
          >

            <div className="flex items-center gap-3">

              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: COLORS[index],
                }}
              />

              <span>{item.name}</span>

            </div>

            <span className="font-semibold">
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}