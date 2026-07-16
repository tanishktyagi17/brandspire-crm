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
    <div className="bg-white rounded-2xl shadow-sm border p-8">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">

        {/* Left Section */}
        <div className="flex items-center gap-6">

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              customer.name
            )}&background=2563eb&color=fff&size=256`}
            alt={customer.name}
            className="w-28 h-28 rounded-full shadow"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {customer.name}
            </h1>

            <p className="text-gray-500 text-lg mt-2">
              {customer.project}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6 text-gray-600">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>{customer.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>{customer.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <FolderKanban size={18} />
                <span>{customer.project}</span>
              </div>

              <div className="flex items-center gap-3">
                <Hash size={18} />
                <span>ID : {customer.id}</span>
              </div>

            </div>

          </div>

        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start lg:items-end gap-4">

          <span
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-lg ${
              customer.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <Circle size={12} fill="currentColor" />
            {customer.status}
          </span>

          <div className="bg-blue-50 rounded-xl px-5 py-4 border">

            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <BadgeCheck size={18} />
              CRM Customer
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Registered customer in your CRM database.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}