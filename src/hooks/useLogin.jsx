import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios, { sanctum } from "../lib/axios";

const useLogin = () => {
  const [error, setError] = useState(null);
  const { setUser, setIsAuth } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      // get sanctum csrf cookie
      await axios.get(sanctum);

      // login
      const loginResponse = await axios.post("login", {
        email: username,
        password,
      });
      const token = loginResponse.data.token;

      // Set the token in headers for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // get user data and store it in auth context
      const { data } = await axios.get("user");
      setUser(data);
      setIsAuth(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };
  return { login, isLoading, error, setIsLoading };
};

export default useLogin;
