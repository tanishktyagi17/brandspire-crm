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
    <div className="h-full rounded-2xl lg:rounded-3xl border bg-white shadow-xl p-4 lg:p-6">

      {/* Header */}

      <div className="mb-5">

        <h2 className="text-lg lg:text-2xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-xs lg:text-base text-slate-500">
          Frequently used CRM shortcuts.
        </p>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 gap-3 lg:gap-4">

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
                border-slate-200
                bg-slate-50
                p-3
                lg:p-4
                text-left
                transition-all
                duration-300

                ${
                  action.disabled
                    ? "cursor-not-allowed opacity-60"
                    : "hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                }
              `}
            >
              <div
                className={`
                  flex
                  h-10
                  w-10
                  lg:h-12
                  lg:w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  ${action.color}
                  text-white
                  shadow-md
                `}
              >
                <Icon size={20} />
              </div>

              <h3 className="mt-3 text-sm lg:text-base font-bold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-1 text-xs lg:text-sm text-slate-500">
                {action.subtitle}
              </p>

            </button>
          );
        })}

      </div>

    </div>
  );
}