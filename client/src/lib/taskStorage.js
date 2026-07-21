const STORAGE_KEY = "tasks";

/*
|--------------------------------------------------------------------------
| Default Tasks
|--------------------------------------------------------------------------
*/

const defaultTasks = [
  {
    id: Date.now() + 1,
    title: "Call John Doe",
    description: "Discuss CRM requirements and next steps.",
    priority: "High",
    status: "Pending",
    dueDate: "2026-07-25",
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 2,
    title: "Send Proposal",
    description: "Email pricing proposal to Microsoft.",
    priority: "Medium",
    status: "Pending",
    dueDate: "2026-07-27",
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 3,
    title: "Team Meeting",
    description: "Weekly sales pipeline review.",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-07-20",
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 4,
    title: "Follow up with Netflix",
    description: "Schedule product demo.",
    priority: "High",
    status: "Pending",
    dueDate: "2026-07-29",
    createdAt: new Date().toISOString(),
  },
];

/*
|--------------------------------------------------------------------------
| Get Tasks
|--------------------------------------------------------------------------
*/

export function getTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      saveTasks(defaultTasks);
      return defaultTasks;
    }

    const tasks = JSON.parse(stored);

    return Array.isArray(tasks) ? tasks : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

/*
|--------------------------------------------------------------------------
| Get Single Task
|--------------------------------------------------------------------------
*/

export function getTaskById(id) {
  return getTasks().find(
    (task) => String(task.id) === String(id)
  );
}

/*
|--------------------------------------------------------------------------
| Save Tasks
|--------------------------------------------------------------------------
*/

export function saveTasks(tasks) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
}

/*
|--------------------------------------------------------------------------
| Add Task
|--------------------------------------------------------------------------
*/

export function addTask(task) {
  const tasks = getTasks();

  const newTask = {
    ...task,
    id: task.id || Date.now(),
    createdAt:
      task.createdAt || new Date().toISOString(),
  };

  tasks.unshift(newTask);

  saveTasks(tasks);

  return newTask;
}

/*
|--------------------------------------------------------------------------
| Update Task
|--------------------------------------------------------------------------
*/

export function updateTask(updatedTask) {
  const tasks = getTasks();

  const updated = tasks.map((task) =>
    String(task.id) === String(updatedTask.id)
      ? {
          ...task,
          ...updatedTask,
        }
      : task
  );

  saveTasks(updated);

  return updatedTask;
}

/*
|--------------------------------------------------------------------------
| Delete Task
|--------------------------------------------------------------------------
*/

export function deleteTask(id) {
  const tasks = getTasks().filter(
    (task) => String(task.id) !== String(id)
  );

  saveTasks(tasks);
}

/*
|--------------------------------------------------------------------------
| Clear Tasks
|--------------------------------------------------------------------------
*/

export function clearTasks() {
  localStorage.removeItem(STORAGE_KEY);
}