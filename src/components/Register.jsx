import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import axios, { sanctum } from "../lib/axios";
import Navbar from "../components/Navbar";
import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";
function Register() {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, isLoading, error, isLoginLoading } = useRegister();

  const handleRegister = (e) => {
    e.preventDefault();

    register(username, password, confirmPassword);
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary">
      <Navbar />
      <div className="flex h-[calc(100vh-80px)] items-center justify-center px-2 font-pally-regular">
        <form
          action=""
          className="w-full max-w-lg rounded-md bg-light px-6 pb-4 pt-10 shadow-sm"
        >
          <div>
            <input
              type="text"
              name=""
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-1 w-full rounded-md border border-dark/30 px-3 py-2 outline-accent-hover"
            />
          </div>
          <p className="mb-3.5 text-destructive">
            {error && error.validation.email}
          </p>
          <div className="relative">
            <input
              type={`${togglePassword ? "text" : "password"}`}
              name=""
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
          <div className="relative">
            <input
              type={`${toggleConfirmPassword ? "text" : "password"}`}
              name=""
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-3 w-full rounded-md border border-dark/30 px-3 py-2 outline-accent-hover"
            />
            {toggleConfirmPassword ? (
              <FaEye
                onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer text-lg text-accent"
              />
            ) : (
              <RiEyeCloseLine
                onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer text-lg text-accent"
              />
            )}
          </div>
          <button
            onClick={handleRegister}
            type="submit"
            disabled={isLoading || isLoginLoading}
            className="uppercas mb-6 w-full rounded-md bg-accent p-2 font-pally-medium text-lg text-light transition-colors ease-in-out hover:bg-accent-hover"
          >
            {isLoading
              ? "Loading...."
              : isLoginLoading
                ? "Logging In..."
                : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
