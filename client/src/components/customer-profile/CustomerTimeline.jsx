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
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Activity Timeline
      </h2>

      <div className="space-y-6">

        {timeline.map((item) => (
          <div
            key={item.id}
            className="flex gap-4"
          >

            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}
            >
              {item.icon}
            </div>

            <div className="flex-1 border-b pb-5">

              <div className="flex justify-between">

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <span className="text-sm text-gray-500">
                  {item.date}
                </span>

              </div>

              <p className="text-gray-600 mt-2">
                {item.description}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}