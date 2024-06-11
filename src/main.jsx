import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CounterProvider } from "./contexts/CounterContext.jsx";
import { TodoProvider } from "./contexts/TodoContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <TodoProvider>
          <App />
        </TodoProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
