import { useEffect, useState } from "react";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Flame,
  TrendingUp,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";

import { getTasks } from "@/lib/taskStorage";

export default function TaskStats({
  refreshKey,
}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, [refreshKey]);

  const totalTasks = tasks.length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completed / totalTasks) * 100);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

      <StatCard
        title="Total Tasks"
        value={totalTasks}
        subtitle="All Tasks"
        change={`${totalTasks} Total`}
        color="bg-gradient-to-r from-blue-600 to-indigo-600"
        icon={<ClipboardList size={30} />}
      />

      <StatCard
        title="Pending"
        value={pending}
        subtitle="Need Attention"
        change={`${pending} Pending`}
        color="bg-gradient-to-r from-amber-500 to-orange-500"
        icon={<Clock3 size={30} />}
      />

      <StatCard
        title="Completed"
        value={completed}
        subtitle="Finished Tasks"
        change={`${completed} Done`}
        color="bg-gradient-to-r from-emerald-500 to-green-600"
        icon={<CheckCircle2 size={30} />}
      />

      <StatCard
        title="High Priority"
        value={highPriority}
        subtitle="Urgent Tasks"
        change={`${highPriority} High`}
        color="bg-gradient-to-r from-red-500 to-pink-600"
        icon={<Flame size={30} />}
      />

      <StatCard
        title="Progress"
        value={`${progress}%`}
        subtitle={`${completed} of ${totalTasks} Completed`}
        change={`${progress}%`}
        color="bg-gradient-to-r from-violet-600 to-fuchsia-600"
        icon={<TrendingUp size={30} />}
      />

    </div>
  );
}