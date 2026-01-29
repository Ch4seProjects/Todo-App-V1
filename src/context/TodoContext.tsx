"use client";

import { createContext, useContext } from "react";
import { Todo } from "../types/todo";

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  getTodos: () => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, todo: Todo) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
}

export default TodoContext;
