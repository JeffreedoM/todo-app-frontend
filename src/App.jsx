import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFoundPage from "./components/NotFoundPage";
import useAuthContext from "./hooks/useAuthContext";

function App() {
  const { isAuth } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate replace to="/login" />}
        />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/register"
          element={!isAuth ? <Register /> : <Navigate replace to="/" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
