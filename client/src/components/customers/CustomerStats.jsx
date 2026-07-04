import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
} from "lucide-react";

export default function CustomerStats({ customers }) {
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  // Since we don't have dates yet, every customer is considered "new"
  const newCustomers = customers.length;

  const stats = [
    {
      title: "Total Customers",
      value: totalCustomers,
      growth: "+12%",
      icon: Users,
      bg: "from-blue-500 to-indigo-600",
    },
    {
      title: "Active Customers",
      value: activeCustomers,
      growth: "+8%",
      icon: UserCheck,
      bg: "from-green-500 to-emerald-600",
    },
    {
      title: "New This Month",
      value: newCustomers,
      growth: "+24%",
      icon: UserPlus,
      bg: "from-orange-500 to-red-500",
    },
    {
      title: "Inactive Customers",
      value: inactiveCustomers,
      growth: "-2%",
      icon: UserX,
      bg: "from-gray-500 to-slate-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className={`bg-gradient-to-r ${item.bg} rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition duration-300`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-80">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {item.value}
                </h2>

                <p className="mt-5 text-sm opacity-90">
                  Growth
                </p>

                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {item.growth}
                </span>
              </div>

              <div className="bg-white/20 p-4 rounded-2xl">
                <Icon size={34} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}