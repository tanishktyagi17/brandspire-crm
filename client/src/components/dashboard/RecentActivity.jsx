import { Clock3 } from "lucide-react";

import { getRecentActivities } from "../../lib/dashboardStats";

const recentActivities = getRecentActivities();

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border bg-white p-4 shadow-xl sm:p-5 lg:p-6">

      {/* Header */}

      <h2 className="text-lg font-bold text-slate-800 sm:text-xl lg:text-2xl">
        Recent Activity
      </h2>

      {/* Activities */}

      <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5 lg:mt-6">

        {recentActivities.map((activity) => (

          <div
            key={activity.id}
            className="flex items-start gap-3 sm:gap-4"
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:h-11 sm:w-11 lg:h-12 lg:w-12">

              <Clock3
                size={18}
                className="text-blue-600 sm:h-5 sm:w-5"
              />

            </div>

            <div className="min-w-0 flex-1">

              <p className="text-sm font-medium text-slate-800 sm:text-base break-words">
                {activity.title}
              </p>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                {activity.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}