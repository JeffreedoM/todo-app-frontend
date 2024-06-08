import axios from "../lib/axios";
import useTodoContext from "./useTodoContext";
const useTodo = () => {
  const { todos, dispatch } = useTodoContext();

  const getTodos = async () => {
    try {
      const response = await axios.get("todo");
      dispatch({ type: "SET_TODOS", payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  const updateCompleted = async (id, isCompleted) => {
    // Optimistically update the state
    dispatch({ type: "TOGGLE_TODO", payload: { id, isCompleted } });

    try {
      const response = await axios.put(`todo/updateCompleted/${id}`, {
        isCompleted,
      });
      if (!response) {
        throw new Error("Failed to update todo");
      }
      console.log(response);
    } catch (error) {
      // Revert optimistic update if the request fails
      dispatch({
        type: "TOGGLE_TODO",
        payload: { id, isCompleted: !isCompleted },
      });
      console.error(error);
    }
  };

  const updateTodo = async (todo, prevTodoName) => {
    const { id, name, isCompleted } = todo;

    // Optimistically update the state
    dispatch({ type: "UPDATE_TODO", payload: { id, name } });
    try {
      const response = await axios.put(`todo/${id}`, {
        name,
        isCompleted,
      });
      if (!response) {
        throw new Error("Failed to update todo");
      }
      console.log(response);
    } catch (error) {
      // Optimistically update the state
      dispatch({ type: "UPDATE_TODO", payload: { id, prevTodoName } });
      console.error(error);
    }
  };

  const getLastId = (todos) => {
    if (todos.length === 0) {
      return null; // or any default value you prefer
    }
    return todos[todos.length - 1].id;
  };
  const newId = getLastId(todos) + 1;

  const createTodo = async (todoName) => {
    // // Optimistically update the state
    // dispatch({
    //   type: "ADD_TODO",
    //   payload: { id: newId, name: todoName, isCompleted: 0 },
    // });

    try {
      const response = await axios.post(`todo/`, {
        name: todoName,
        isCompleted: 0,
      });
      if (!response) {
        throw new Error("Failed to create todo");
      }
      if (response.status === 201) {
        dispatch({ type: "ADD_TODO", payload: response.data });
      }
      console.log(response);
    } catch (error) {
      dispatch({
        type: "REMOVE_TODO",
        payload: { id: newId, name: todoName, isCompleted: 0 },
      });
      console.error(error);
    }
  };

  const deleteTodo = async (todo) => {
    const { id, name, isCompleted } = todo;

    dispatch({
      type: "REMOVE_TODO",
      payload: { id, name, isCompleted },
    });

    try {
      const response = await axios.delete(`todo/${id}`);
      if (!response) {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      dispatch({
        type: "ADD_TODO",
        payload: { id, name, isCompleted },
      });
      console.error(error);
    }
  };

  return { getTodos, updateCompleted, createTodo, deleteTodo, updateTodo };
};

export default useTodo;
