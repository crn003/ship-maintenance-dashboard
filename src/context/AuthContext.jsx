import React, { createContext, useState, useEffect, useContext } from "react";
import mockData from "../data/mockData"; // ✅ Ensure correct mockData import

// ✅ CREATE CONTEXT
export const AuthContext = createContext();

// ✅ OPTIONAL: useAuth hook (recommended)
export const useAuth = () => useContext(AuthContext);

// ✅ PROVIDER
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password) => {
    const foundUser = mockData.users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      return foundUser; // ✅ Return user
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
