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
          icon: (
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
          ),
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
    <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-6">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold sm:text-2xl">
          Projects
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current customer project progress.
        </p>
      </div>

      {/* Project List */}
      <div className="space-y-4">

        {projects.map((project) => {
          const status = getStatus(project.status);

          return (
            <div
              key={project.id}
              className="
                flex
                flex-col
                gap-4
                rounded-xl
                border
                p-4
                transition
                hover:bg-slate-50
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="min-w-0">

                <h3 className="truncate text-lg font-semibold text-slate-800">
                  {project.name}
                </h3>

              </div>

              <span
                className={`
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  px-3
                  py-2
                  text-sm
                  font-semibold
                  whitespace-nowrap
                  ${status.color}
                `}
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