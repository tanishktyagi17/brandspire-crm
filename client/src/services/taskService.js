import api from "./api";

/* ==========================================
   GET ALL TASKS
========================================== */

export const getTasks = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

/* ==========================================
   GET SINGLE TASK
========================================== */

export const getTaskById = async (id) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

/* ==========================================
   CREATE TASK
========================================== */

export const createTask = async (task) => {
  const { data } = await api.post("/tasks", task);
  return data;
};

/* ==========================================
   UPDATE TASK
========================================== */

export const updateTask = async (id, task) => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data;
};

/* ==========================================
   DELETE TASK
========================================== */

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};