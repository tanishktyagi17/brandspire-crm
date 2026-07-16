const STORAGE_KEY = "tasks";

/**
 * Default Tasks
 */
const defaultTasks = [
  {
    id: 1,
    title: "Call John Doe",
    description: "Discuss CRM requirements and next steps.",
    priority: "High",
    status: "Pending",
    dueDate: "Tomorrow",
  },
  {
    id: 2,
    title: "Send Proposal",
    description: "Email pricing proposal to Microsoft.",
    priority: "Medium",
    status: "Pending",
    dueDate: "Jul 10",
  },
  {
    id: 3,
    title: "Team Meeting",
    description: "Weekly sales pipeline review.",
    priority: "Low",
    status: "Completed",
    dueDate: "Completed",
  },
  {
    id: 4,
    title: "Follow up with Netflix",
    description: "Schedule product demo.",
    priority: "High",
    status: "Pending",
    dueDate: "Jul 12",
  },
];

/**
 * Get all tasks
 */
export function getTasks() {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY);

    if (!tasks) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultTasks)
      );

      return defaultTasks;
    }

    return JSON.parse(tasks);
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

/**
 * Get task by ID
 */
export function getTaskById(id) {
  return getTasks().find(
    (task) => String(task.id) === String(id)
  );
}

/**
 * Save all tasks
 */
export function saveTasks(tasks) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
}

/**
 * Add task
 */
export function addTask(task) {
  const tasks = getTasks();

  tasks.push(task);

  saveTasks(tasks);

  return task;
}

/**
 * Update task
 */
export function updateTask(updatedTask) {
  const tasks = getTasks();

  const updatedTasks = tasks.map((task) =>
    String(task.id) === String(updatedTask.id)
      ? {
          ...task,
          ...updatedTask,
        }
      : task
  );

  saveTasks(updatedTasks);
}

/**
 * Delete task
 */
export function deleteTask(id) {
  const filteredTasks = getTasks().filter(
    (task) => String(task.id) !== String(id)
  );

  saveTasks(filteredTasks);
}

/**
 * Clear all tasks
 */
export function clearTasks() {
  localStorage.removeItem(STORAGE_KEY);
}