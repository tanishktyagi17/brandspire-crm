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
    <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Section */}
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              customer.name
            )}&background=2563eb&color=fff&size=256`}
            alt={customer.name}
            className="h-24 w-24 rounded-full shadow-md sm:h-28 sm:w-28 lg:h-32 lg:w-32"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl lg:text-4xl">
              {customer.name}
            </h1>

            <p className="mt-2 text-base text-gray-500 lg:text-lg">
              {customer.project}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-gray-600 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600" />
                <span className="break-all">{customer.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600" />
                <span>{customer.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <FolderKanban size={18} className="text-blue-600" />
                <span>{customer.project}</span>
              </div>

              <div className="flex items-center gap-3">
                <Hash size={18} className="text-blue-600" />
                <span>ID : {customer.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full flex-col gap-4 lg:w-auto lg:items-end">
          <span
            className={`flex w-fit items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold sm:text-base ${
              customer.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <Circle size={12} fill="currentColor" />
            {customer.status}
          </span>

          <div className="w-full rounded-xl border bg-blue-50 p-4 lg:w-72">
            <div className="flex items-center gap-2 font-semibold text-blue-700">
              <BadgeCheck size={18} />
              CRM Customer
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Registered customer in your CRM database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}