import {
  User,
  Briefcase,
  Mail,
  Phone,
  BadgeCheck,
} from "lucide-react";

export default function CustomerInfo({ customer }) {
  if (!customer) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-red-600">
          Customer Information
        </h2>

        <p className="mt-3 text-red-500">
          Customer not found.
        </p>
      </div>
    );
  }

  const cards = [
    {
      icon: User,
      label: "Customer Name",
      value: customer.name,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Briefcase,
      label: "Project Name",
      value: customer.project,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
    {
      icon: Mail,
      label: "Email Address",
      value: customer.email,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: customer.phone,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Customer Information
            </h2>

            <p className="mt-1 text-slate-300">
              Invoice Recipient Details
            </p>

          </div>

          <div className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white flex items-center gap-2">
            <BadgeCheck size={16} />
            Verified
          </div>

        </div>

      </div>

      {/* Body */}
      <div className="grid gap-6 p-8 md:grid-cols-2">

        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
                >
                  <Icon
                    className={item.color}
                    size={24}
                  />
                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    {item.label}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-slate-800 break-all">
                    {item.value || "-"}
                  </h3>

                </div>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}