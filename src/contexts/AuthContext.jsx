import { useEffect, useState } from "react";
import { createContext } from "react";

import axios from "../lib/axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // check if there is token in the localStorage
    const token = JSON.parse(localStorage.getItem("token"));

    // If there is token
    // Get the user data
    if (token) {
      setIsAuth(true);

      const getUser = async () => {
        // Set the token in headers for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const { data } = await axios.get("user");
        setUser(data);
      };

      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
