import { useEffect, useState } from "react";

import { Clock3 } from "lucide-react";

import { getRecentActivities } from "../../services/dashboardService";

export default function RecentActivity() {
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await getRecentActivities();
        setRecentActivities(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadActivities();
  }, []);

  return (
    <div className="rounded-2xl lg:rounded-3xl border bg-white shadow-xl p-4 lg:p-6">

      {/* Header */}

      <h2 className="text-lg lg:text-2xl font-bold text-slate-800">
        Recent Activity
      </h2>

      <p className="mt-1 text-xs lg:text-base text-slate-500">
        Latest actions performed in your CRM.
      </p>

      {/* Activities */}

      <div className="mt-5 space-y-4">

        {recentActivities.map((activity) => (

          <div
            key={activity.id}
            className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:bg-slate-100"
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">

              <Clock3
                size={18}
                className="text-blue-600"
              />

            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm lg:text-base font-semibold text-slate-800">
                {activity.title}
              </p>

              <p className="mt-1 text-xs lg:text-sm text-slate-500">
                {activity.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}