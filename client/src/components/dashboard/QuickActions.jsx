import {
  UserPlus,
  FileText,
  Target,
  CheckSquare,
  Mail,
  BarChart3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Customer",
    subtitle: "Add Customer",
    icon: UserPlus,
    color:
      "from-blue-500 to-indigo-600",
    path: "/customers",
  },
  {
    title: "Invoice",
    subtitle: "Create Invoice",
    icon: FileText,
    color:
      "from-emerald-500 to-green-600",
    path: "/invoice",
  },
  {
    title: "Lead",
    subtitle: "Manage Leads",
    icon: Target,
    color:
      "from-orange-500 to-red-500",
    path: "/leads",
  },
  {
    title: "Task",
    subtitle: "Manage Tasks",
    icon: CheckSquare,
    color:
      "from-violet-500 to-purple-600",
    path: "/tasks",
  },
  {
    title: "Email",
    subtitle: "Coming Soon",
    icon: Mail,
    color:
      "from-cyan-500 to-sky-600",
    disabled: true,
  },
  {
    title: "Reports",
    subtitle: "Coming Soon",
    icon: BarChart3,
    color:
      "from-pink-500 to-rose-600",
    disabled: true,
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-xl h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-slate-500">
          Frequently used CRM shortcuts.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              disabled={action.disabled}
              onClick={() =>
                !action.disabled &&
                navigate(action.path)
              }
              className={`group rounded-2xl p-4 text-left border transition-all duration-300
                ${
                  action.disabled
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:-translate-y-1 hover:shadow-xl"
                }`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color}
                flex items-center justify-center text-white shadow-lg`}
              >
                <Icon size={24} />
              </div>

              <h3 className="mt-4 font-bold text-slate-800">
                {action.title}
              </h3>

              <p className="text-sm text-slate-500">
                {action.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}