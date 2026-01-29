"use client";

import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import TodoContext from "./TodoContext";
import {
  getTodos as getTodosService,
  createTodo as createTodoService,
  updateTodo as updateTodoService,
  deleteTodo as deleteTodoService,
} from "../services/todos";

interface TodoProviderProps {
  children: React.ReactNode;
}

export default function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodosService().then(setTodos);
  }, []);

  const addTodo = async (title: Todo["title"]) => {
    const newTodo = await createTodoService(title);
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = async (id: Todo["_id"]) => {
    await deleteTodoService(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  const updateTodo = async (id: Todo["_id"], todo: Todo) => {
    const updated = await updateTodoService(id, todo);
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
