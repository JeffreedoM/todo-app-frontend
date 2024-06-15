import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import Navbar from "./Navbar.jsx";
import useLogin from "../hooks/useLogin.jsx";
import { FaCheck } from "react-icons/fa6";

function Login() {
  const [togglePassword, setTogglePassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password, remember);
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary">
      <Navbar />
      <div className="flex h-[calc(100vh-80px)] items-center justify-center px-2 font-pally-regular">
        <form
          onSubmit={handleLogin}
          action=""
          className="w-full max-w-lg rounded-md bg-light px-6 pb-4 pt-10 shadow-sm"
        >
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-1 w-full rounded-md border border-dark/30 px-3 py-2 outline-accent-hover"
            />
            <p className="mb-3.5 text-destructive">
              {error && error.validation.email}
            </p>
          </div>
          <div className="relative">
            <input
              type={`${togglePassword ? "text" : "password"}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-1 w-full rounded-md border border-dark/30 px-3 py-2 outline-accent-hover"
            />
            {togglePassword ? (
              <FaEye
                onClick={() => setTogglePassword(!togglePassword)}
                className="absolute right-3 top-3 cursor-pointer text-lg text-accent"
              />
            ) : (
              <RiEyeCloseLine
                onClick={() => setTogglePassword(!togglePassword)}
                className="absolute right-3 top-3 cursor-pointer text-lg text-accent"
              />
            )}
            <p className="mb-3.5 text-destructive">
              {error && error.validation.password}
            </p>
          </div>
          <div className="mb-6 ml-1 flex items-center gap-x-2">
            {!remember ? (
              <>
                <div
                  onClick={() => setRemember(!remember)}
                  className="flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-sm border border-dark"
                ></div>
                <p className="pt-[2px] leading-none">Keep me signed in</p>
              </>
            ) : (
              <>
                <div
                  onClick={() => setRemember(!remember)}
                  className="flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-sm border border-dark bg-accent text-sm text-light"
                >
                  <FaCheck />
                </div>
                <p className="pt-[2px] leading-none">Keep me signed in</p>
              </>
            )}
          </div>
          <p className="mb-3.5 text-destructive">{error && error.message}</p>
          <button
            type="submit"
            disabled={isLoading}
            className="uppercas mb-3 w-full rounded-md bg-accent p-2 font-pally-medium text-lg text-light transition-colors ease-in-out hover:bg-accent-hover"
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>

          <div className="flex justify-center gap-1">
            <p>Don't have an account? </p>
            <Link
              className="text-accent-hover underline underline-offset-2"
              to={"/register"}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
