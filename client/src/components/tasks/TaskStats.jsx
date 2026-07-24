import { useEffect, useState } from "react";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Flame,
  TrendingUp,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";

import { getTasks } from "../../services/taskService";

export default function TaskStats({ refreshKey }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, [refreshKey]);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

      <StatCard
        title="Total Tasks"
        value={totalTasks}
        subtitle="All Assigned Tasks"
        change="+12%"
        color="bg-gradient-to-r from-blue-600 to-cyan-500"
        icon={<ClipboardList size={30} />}
      />

      <StatCard
        title="Pending"
        value={pendingTasks}
        subtitle="Awaiting Completion"
        change={
          pendingTasks === 0
            ? "All Clear"
            : `${pendingTasks} Remaining`
        }
        color="bg-gradient-to-r from-amber-500 to-orange-500"
        icon={<Clock3 size={30} />}
      />

      <StatCard
        title="Completed"
        value={completedTasks}
        subtitle="Successfully Finished"
        change={`${progress}% Complete`}
        color="bg-gradient-to-r from-emerald-600 to-green-500"
        icon={<CheckCircle2 size={30} />}
      />

      <StatCard
        title="High Priority"
        value={highPriorityTasks}
        subtitle="Urgent Tasks"
        change={
          highPriorityTasks === 0
            ? "No Urgent"
            : `${highPriorityTasks} Critical`
        }
        color="bg-gradient-to-r from-red-500 to-pink-600"
        icon={<Flame size={30} />}
      />

      <StatCard
        title="Productivity"
        value={`${progress}%`}
        subtitle={`${completedTasks} of ${totalTasks} Completed`}
        change={
          progress >= 80
            ? "Excellent"
            : progress >= 50
            ? "On Track"
            : "Needs Focus"
        }
        color="bg-gradient-to-r from-violet-600 to-fuchsia-600"
        icon={<TrendingUp size={30} />}
      />

    </div>
  );
}