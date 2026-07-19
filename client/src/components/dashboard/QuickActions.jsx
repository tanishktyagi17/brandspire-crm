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
    color: "from-blue-500 to-indigo-600",
    path: "/customers",
  },
  {
    title: "Invoice",
    subtitle: "Create Invoice",
    icon: FileText,
    color: "from-emerald-500 to-green-600",
    path: "/invoice/new",
  },
  {
    title: "Lead",
    subtitle: "Manage Leads",
    icon: Target,
    color: "from-orange-500 to-red-500",
    path: "/leads",
  },
  {
    title: "Task",
    subtitle: "Manage Tasks",
    icon: CheckSquare,
    color: "from-violet-500 to-purple-600",
    path: "/tasks",
  },
  {
    title: "Email",
    subtitle: "Coming Soon",
    icon: Mail,
    color: "from-cyan-500 to-sky-600",
    disabled: true,
  },
  {
    title: "Reports",
    subtitle: "Coming Soon",
    icon: BarChart3,
    color: "from-pink-500 to-rose-600",
    disabled: true,
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="h-full rounded-3xl border bg-white p-4 shadow-xl sm:p-5 lg:p-6">

      {/* Header */}

      <div className="mb-4 lg:mb-6">
        <h2 className="text-lg font-bold text-slate-800 sm:text-xl lg:text-2xl">
          Quick Actions
        </h2>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm lg:text-base">
          Frequently used CRM shortcuts.
        </p>
      </div>

      {/* Actions */}

      <div className="grid grid-cols-2 gap-3 sm:gap-4">

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
              className={`
                group
                rounded-2xl
                border
                p-3
                text-left
                transition-all
                duration-300
                sm:p-4

                ${
                  action.disabled
                    ? "cursor-not-allowed opacity-60"
                    : "hover:-translate-y-1 hover:shadow-xl"
                }
              `}
            >
              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  text-white
                  shadow-lg
                  sm:h-12
                  sm:w-12
                  ${action.color}
                `}
              >
                <Icon size={20} />
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-800 sm:mt-4 sm:text-base">
                {action.title}
              </h3>

              <p className="text-xs text-slate-500 sm:text-sm">
                {action.subtitle}
              </p>

            </button>
          );
        })}

      </div>

    </div>
  );
}