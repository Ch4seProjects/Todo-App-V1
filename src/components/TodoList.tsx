"use client";

import React, { useMemo } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";
import { useTodoContext } from "../context/TodoContext";

export default function TodoList() {
  const { todos } = useTodoContext();

  const sortedTodos = useMemo(() => {
    return [...todos].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [todos]);

  return (
    <div className="bg-white p-8 rounded-xl flex flex-col gap-8">
      <div className="">
        <p className="text-3xl font-semibold text-gray-800">To-Do List</p>
        <p className="text-gray-600 mt-2">Your tasks will appear here</p>
      </div>
      <TodoInput />
      <div className="h-[300px] overflow-auto">
        {todos.length > 0 ? (
          sortedTodos.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <p className="text-gray-600 mt-2 italic text-center">
            You have no tasks.
          </p>
        )}
      </div>
    </div>
  );
}
