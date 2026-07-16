import { Clock3 } from "lucide-react";

import { getRecentActivities } from "../../lib/dashboardStats";

const recentActivities = getRecentActivities();

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-slate-800">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-5">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4"
          >
            <div className="rounded-full bg-blue-100 p-2">
              <Clock3
                size={18}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="font-medium">
                {activity.title}
              </p>

              <p className="text-sm text-gray-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}