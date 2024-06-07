import useCounter from "../hooks/useCounter";

function Counter() {
  const { count, dispatch } = useCounter();

  return (
    <div>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <div>{count}</div>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button
        onClick={() => dispatch({ type: "increaseByAmount", payload: 10 })}
      >
        +10
      </button>
    </div>
  );
}

export default Counter;
