import { useReducer } from "react";
import { createContext } from "react";

export const CounterContext = createContext();

const CounterReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "increaseByAmount":
      return {
        count: state.count + action.payload,
      };
  }
};

export const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CounterReducer, { count: 0 });

  return (
    <CounterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};
