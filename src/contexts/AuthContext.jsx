import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
