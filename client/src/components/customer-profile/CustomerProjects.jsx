import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
} from "lucide-react";

export default function CustomerProjects() {
  const projects = [
    {
      id: 1,
      name: "CRM Development",
      status: "Completed",
    },
    {
      id: 2,
      name: "Admin Dashboard",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Mobile App",
      status: "Planning",
    },
  ];

  const getStatus = (status) => {
    switch (status) {
      case "Completed":
        return {
          icon: <CheckCircle2 size={18} />,
          color: "bg-green-100 text-green-700",
        };

      case "In Progress":
        return {
          icon: <LoaderCircle size={18} className="animate-spin" />,
          color: "bg-blue-100 text-blue-700",
        };

      default:
        return {
          icon: <Clock3 size={18} />,
          color: "bg-yellow-100 text-yellow-700",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Projects
      </h2>

      <div className="space-y-4">

        {projects.map((project) => {
          const status = getStatus(project.status);

          return (
            <div
              key={project.id}
              className="flex items-center justify-between border rounded-xl p-4 hover:bg-slate-50"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {project.name}
                </h3>
              </div>

              <span
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold ${status.color}`}
              >
                {status.icon}
                {project.status}
              </span>
            </div>
          );
        })}

      </div>

    </div>
  );
}