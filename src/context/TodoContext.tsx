"use client";

import { createContext, useContext } from "react";
import { Todo } from "../types/todo";

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: Todo["title"]) => Promise<void>;
  deleteTodo: (id: Todo["_id"]) => Promise<void>;
  updateTodo: (id: Todo["_id"], todo: Todo) => Promise<void>;
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
