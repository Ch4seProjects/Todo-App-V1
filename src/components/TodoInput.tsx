import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import { handleKeyDown } from "../utils/onKeyDown";

export default function TodoInput() {
  const [inputValue, setInputValue] = useState("");
  const { addTodo } = useTodoContext();

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = async () => {
    if (!inputValue.trim()) return;

    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <div className="bg-gray-100 w-[500px] h-[60px] rounded-full relative">
      <input
        aria-label="New Todo Title"
        value={inputValue}
        placeholder="Add a task"
        className="w-full h-full rounded-full px-6 py-2 flex-1 focus:outline-none"
        onChange={inputOnChange}
        onKeyDown={(e) => handleKeyDown(e, handleAddTodo)}
      />
      <button
        aria-label="Add Todo"
        className="cursor-pointer bg-orange-600 text-white rounded-full p-2 absolute right-0 h-full w-[150px] hover:bg-orange-500 transition-all duration-300"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </div>
  );
}
