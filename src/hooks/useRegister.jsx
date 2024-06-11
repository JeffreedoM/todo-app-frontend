import { useState } from "react";
import axios, { sanctum } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import useLogin from "./useLogin";

const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    login,
    setIsLoading: setIsLoginLoading,
    isLoading: isLoginLoading,
  } = useLogin();

  const register = async (username, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.get(sanctum);

      const response = await axios.post("register", {
        email: username,
        password,
        password_confirmation: confirmPassword,
      });

      setIsLoading(false);

      setIsLoginLoading(true);
      await login(username, password);
      setIsLoginLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };
  return { register, isLoading, error, isLoginLoading };
};

export default useRegister;
