"use client";

import { useState } from "react";
import { Todo } from "../types/todo";
import TodoContext from "./TodoContext";

interface TodoProviderProps {
  children: React.ReactNode;
}

export default function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.random(),
      title,
      isCompleted: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const getTodos = () => {
    const data: Todo[] = [];
    setTodos(data);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, getTodos, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
