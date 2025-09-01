import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../lib/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async ({ username, email, password }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
     console.log("🔴 Logout function called");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const forgotPassword = async (email) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "OTP verification failed");
    }
  };

  const resetPassword = async (email, newPassword) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/reset-password`, { email, newPassword });
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Reset password failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        forgotPassword,
        verifyOtp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
