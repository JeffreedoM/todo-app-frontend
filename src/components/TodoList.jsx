import { useRef, useState, useEffect } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import useTodo from "../hooks/useTodo";
import useTodoContext from "../hooks/useTodoContext";

function TodoList({ todo }) {
  const { updateCompleted, deleteTodo, getTodos, updateTodo } = useTodo();
  const { todos, dispatch } = useTodoContext();
  const [completed, setCompleted] = useState(todo.isCompleted);
  const [toggleUpdateInput, setToggleUpdateInput] = useState(false);
  const updateTodoRef = useRef(null);
  const [todoName, setTodoName] = useState(todo.name);

  const handleCheck = () => {
    const newCompleted = completed === 1 ? 0 : 1;
    setCompleted(newCompleted);
    updateCompleted(todo.id, newCompleted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo({ ...todo, name: todoName }, todo.name);
    setToggleUpdateInput(!toggleUpdateInput);
  };

  const handleDelete = () => {
    deleteTodo(todo);
  };

  // For clicking update button
  useEffect(() => {
    if (toggleUpdateInput) {
      updateTodoRef.current.focus();
    }
  }, [toggleUpdateInput]);

  const handleUpdateClick = () => {
    setToggleUpdateInput((prev) => !prev);
  };

  return (
    <div className="my-3 flex justify-between">
      <div className="flex w-full gap-x-3">
        <div className="flex items-center justify-center">
          {!completed ? (
            <button
              onClick={handleCheck}
              className="flex h-5 w-5 items-center justify-center rounded-sm border-2 border-dark"
            ></button>
          ) : (
            <button
              onClick={handleCheck}
              className="flex h-5 w-5 items-center justify-center rounded-sm border border-dark bg-accent text-sm text-light"
            >
              <FaCheck />
            </button>
          )}
        </div>

        {!toggleUpdateInput ? (
          <p className="line-clamp-1 max-w-xl break-words" title={todo.name}>
            {todo.name}
          </p>
        ) : (
          <form onSubmit={handleSubmit} action="" className="w-full">
            <input
              type="text"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              ref={updateTodoRef}
              className="block w-[90%] rounded-md border border-accent/80 p-1"
            />
          </form>
        )}
      </div>
      <div className="flex items-center gap-1 font-extralight">
        <button
          onClick={handleUpdateClick}
          className="flex h-8 w-8 items-center justify-center rounded-md border bg-accent pl-1 text-light shadow-md"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="flex h-8 w-8 items-center justify-center rounded-md border bg-accent text-light shadow-md"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

export default TodoList;
