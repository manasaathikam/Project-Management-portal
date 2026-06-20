import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchTasks = (params) =>
  API.get("/tasks", { params });

export const createTask = (data) =>
  API.post("/tasks", data);

export const updateTaskStatus = (id, status) =>
  API.put(`/tasks/${id}`, { status });

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export const fetchStats = () =>
  API.get("/tasks/stats");

export default API;