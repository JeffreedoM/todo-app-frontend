import { useEffect } from "react";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodo from "./hooks/useTodo";
import useTodoContext from "./hooks/useTodoContext";

function App() {
  const { todos, dispatch } = useTodoContext();
  const { getTodos } = useTodo();

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <div className="h-screen bg-gradient-to-r from-primary to-secondary px-2 font-pally-regular lg:px-0">
      <Navbar />
      <TodoForm />
      <div className="mx-auto mt-10 max-w-screen-md rounded-md bg-white px-4 py-2 font-pally-medium text-lg shadow-md">
        {todos.length > 0 ? (
          todos.map((todo) => <TodoList key={todo.id} todo={todo} />)
        ) : (
          <div className="my-4 text-center">
            Your to-do list is empty. Add some tasks to get started!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
