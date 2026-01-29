import clsx from "clsx";
import React, { useState } from "react";
import { X, Check, Edit } from "lucide-react";
import { Todo } from "../types/todo";
import { useTodoContext } from "../context/TodoContext";
import { handleKeyDown } from "../utils/onKeyDown";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { id, title, isCompleted } = todo;
  const { deleteTodo, updateTodo } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleDeleteTodo = async () => {
    await deleteTodo(id);
  };

  const handleUpdateTodo = async () => {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle || trimmedTitle === title) {
      setIsEditing(false);
      return;
    }

    await updateTodo(id, { ...todo, title: trimmedTitle });
    setIsEditing(false);
  };

  return (
    <div
      className={clsx(
        "relative px-4 py-5 flex items-center gap-2 rounded-xl mr-2",
        isEditing ? "border-2 border-dashed" : "hover:bg-gray-100",
      )}
      onClick={async (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && !target.closest("button, svg")) {
          await updateTodo(id, { ...todo, isCompleted: !isCompleted });
        }
      }}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={async () => {
          await updateTodo(id, { ...todo, isCompleted: !isCompleted });
        }}
        className="h-6 w-6"
        onClick={(e) => e.stopPropagation()}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          autoFocus
          className={clsx(
            "border-none outline-none w-full italic",
            isCompleted && "line-through text-gray-400",
          )}
          onKeyDown={(e) => handleKeyDown(e, handleUpdateTodo)}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <p className={clsx(isCompleted && "line-through text-gray-400")}>
          {title}
        </p>
      )}
      <div className="h-full flex items-center justify-center gap-4 absolute right-2 top-0">
        {isEditing ? (
          <Check
            size={24}
            className="cursor-pointer text-green-600"
            onClick={handleUpdateTodo}
          />
        ) : (
          <Edit
            size={20}
            className="cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        )}
        <X
          size={24}
          className="cursor-pointer text-black hover:text-red-600 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTodo();
          }}
        />
      </div>
    </div>
  );
}
