import {
  Mail,
  Phone,
  FolderKanban,
  Circle,
  Hash,
  BadgeCheck,
} from "lucide-react";

export default function CustomerHeader({ customer }) {
  if (!customer) return null;

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm lg:p-8">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Section */}

        <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-6">

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              customer.name
            )}&background=2563eb&color=fff&size=256`}
            alt={customer.name}
            className="h-24 w-24 rounded-full shadow-lg sm:h-28 sm:w-28"
          />

          <div className="flex-1">

            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl lg:text-4xl">
              {customer.name}
            </h1>

            <p className="mt-2 text-base text-slate-500 sm:text-lg">
              {customer.project}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600" />
                <span className="break-all text-sm sm:text-base">
                  {customer.email}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-green-600" />
                <span className="text-sm sm:text-base">
                  {customer.phone}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FolderKanban size={18} className="text-violet-600" />
                <span className="text-sm sm:text-base">
                  {customer.project}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Hash size={18} className="text-orange-600" />
                <span className="text-sm sm:text-base">
                  ID : {customer.id}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex flex-col items-center gap-4 lg:items-end">

          <span
            className={`flex items-center gap-2 rounded-full px-5 py-2 font-semibold ${
              customer.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <Circle
              size={10}
              fill="currentColor"
            />
            {customer.status}
          </span>

          <div className="w-full rounded-xl border bg-blue-50 p-4 text-center lg:w-72 lg:text-left">

            <div className="flex items-center justify-center gap-2 font-semibold text-blue-700 lg:justify-start">
              <BadgeCheck size={18} />
              CRM Customer
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Registered customer in your CRM database.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}