import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();
const baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_DEV_LOCAL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${baseURL}api/user/auth/login`, { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify([user]));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
