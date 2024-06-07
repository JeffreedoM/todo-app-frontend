import { useState } from "react";
import useTodo from "../hooks/useTodo";

function TodoForm() {
  const [todoName, setTodoName] = useState();
  const { createTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();

    createTodo(todoName);

    setTodoName("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto mt-20 max-w-screen-md">
        <h1 className="mb-3 font-pally-bold text-6xl">To Do List</h1>
        <input
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          type="text"
          className="w-full rounded-md p-3 px-4 shadow outline-none"
          placeholder="Add Todo..."
        />
      </form>
    </>
  );
}

export default TodoForm;
