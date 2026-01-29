import api from "../lib/api";
import { Todo } from "../types/todo";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await api.get("/api/todos");
  return res.data;
};

export const getTodoById = async (id: Todo["id"]): Promise<Todo> => {
  const res = await api.get(`/api/todos/${id}`);
  return res.data;
};

export const createTodo = async (title: Todo["title"]): Promise<Todo> => {
  const res = await api.post("/api/todos", { title });
  return res.data;
};

export const updateTodo = async (
  id: Todo["id"],
  updates: Partial<Todo>,
): Promise<Todo> => {
  const res = await api.put(`/api/todos/${id}`, updates);
  return res.data;
};

export const deleteTodo = async (id: Todo["id"]): Promise<void> => {
  await api.delete(`/api/todos/${id}`);
};
