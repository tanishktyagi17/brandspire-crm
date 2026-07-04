import DashboardLayout from "../layouts/DashboardLayout";

function Tasks() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-slate-800">Tasks</h1>
      <p className="mt-2 text-gray-500">
        Manage your tasks here.
      </p>
    </DashboardLayout>
  );
}

export default Tasks;