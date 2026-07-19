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
    <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className={`bg-gradient-to-r ${item.bg} rounded-2xl lg:rounded-3xl p-4 lg:p-6 text-white shadow-xl transition hover:scale-105`}
          >
            <div className="flex flex-col justify-between h-full">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-[11px] sm:text-sm opacity-90">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl lg:text-4xl font-bold">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-white/20 p-2 lg:p-4">
                  <Icon size={24} className="lg:w-8 lg:h-8" />
                </div>

              </div>

              <div className="mt-5">

                <p className="text-xs lg:text-sm opacity-80">
                  Growth
                </p>

                <span className="mt-2 inline-block rounded-full bg-white/20 px-2 py-1 lg:px-3 text-xs lg:text-sm">
                  {item.growth}
                </span>

              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}