import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import useTodo from "../hooks/useTodo";
import useTodoContext from "../hooks/useTodoContext";

function Home() {
  const { todos, dispatch } = useTodoContext();
  const { getTodos } = useTodo();
  const [toggleCompleted, setToggleCompleted] = useState(false);
  const incompleteTasks = todos.filter((todo) => todo.isCompleted !== 1);
  const completedTasks = todos.filter((todo) => todo.isCompleted === 1);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-secondary px-2 pb-2 font-pally-regular lg:px-0">
      <Navbar />
      <TodoForm />

      <div className="mx-auto -mb-1 mt-10 flex max-w-screen-md">
        <div
          onClick={() => setToggleCompleted(false)}
          className={`cursor-pointer rounded-tl-md rounded-tr-md ${!toggleCompleted ? "bg-white" : "bg-white/50"} p-2 px-4`}
        >
          Todo
        </div>
        <div
          onClick={() => setToggleCompleted(true)}
          className={`cursor-pointer rounded-tl-md rounded-tr-md ${toggleCompleted ? "bg-white" : "bg-white/50"} p-2 px-4`}
        >
          Completed
        </div>
      </div>
      <div className="z-1 mx-auto max-w-screen-md rounded-md bg-white px-4 py-2 font-pally-medium text-lg shadow-md">
        {!toggleCompleted ? (
          <div>
            {incompleteTasks.length > 0 ? (
              incompleteTasks.map((todo) => (
                <TodoList key={todo.id} todo={todo} />
              ))
            ) : (
              <div className="my-4 text-center">
                Your to-do list is empty. Add some tasks to get started!
              </div>
            )}
          </div>
        ) : (
          <div>
            {completedTasks.length > 0 ? (
              completedTasks.map((todo) => (
                <TodoList key={todo.id} todo={todo} />
              ))
            ) : (
              <div className="my-4 text-center">
                Your to-do list is empty. Add some tasks to get started!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
