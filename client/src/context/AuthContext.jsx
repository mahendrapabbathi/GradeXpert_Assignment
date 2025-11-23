import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const VITE_backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${VITE_backendUrl}/api/users/login`,
        { email, password },
        { withCredentials: true } // send cookie
      );
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Login failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${VITE_backendUrl}/api/users/register`,
        { name, email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Registration failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post(`${VITE_backendUrl}/api/users/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Check logged-in user based on token cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${VITE_backendUrl}/api/users/profile`, {
          withCredentials: true, // send cookie
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
