import {
  UserPlus,
  FileText,
  CreditCard,
  FolderKanban,
  Bell,
} from "lucide-react";

export default function CustomerTimeline() {
  const timeline = [
    {
      id: 1,
      title: "Customer Added",
      date: "15 Jul 2026",
      description: "Customer profile was created.",
      icon: <UserPlus size={18} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Project Started",
      date: "18 Jul 2026",
      description: "CRM Development project started.",
      icon: <FolderKanban size={18} />,
      color: "bg-violet-100 text-violet-600",
    },
    {
      id: 3,
      title: "Invoice Generated",
      date: "22 Jul 2026",
      description: "Invoice BRD-2026-0001 created.",
      icon: <FileText size={18} />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      title: "Payment Received",
      date: "25 Jul 2026",
      description: "₹53,100 received successfully.",
      icon: <CreditCard size={18} />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 5,
      title: "Reminder Sent",
      date: "28 Jul 2026",
      description: "Automatic payment reminder sent.",
      icon: <Bell size={18} />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold sm:text-2xl">
          Activity Timeline
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Recent activities for this customer.
        </p>
      </div>

      <div className="space-y-6">

        {timeline.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-4"
          >
            {/* Icon */}
            <div
              className={`
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                ${item.color}
              `}
            >
              {item.icon}
            </div>

            {/* Content */}
            <div
              className={`flex-1 ${
                index !== timeline.length - 1
                  ? "border-b pb-6"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <span className="text-sm text-slate-500">
                  {item.date}
                </span>

              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}