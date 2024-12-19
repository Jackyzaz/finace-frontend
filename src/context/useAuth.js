// useAuth.js
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useCookie } from "./useCookie";
import axios from "axios";

const AuthContext = createContext();

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_AUTH = "/api/auth/local";

export const AuthProvider = ({ children }) => {
  const [user, setUser, removeUser] = useCookie("user", null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.jwt) {
      axios.defaults.headers.common["Authorization"] = `bearer ${user.jwt}`;
    }
  }, [user]);

  const login = useCallback(
    async (formData) => {
      try {
        const response = await axios.post(URL_AUTH, formData);
        const { jwt, user: userData } = response.data;
        axios.defaults.headers.common = { Authorization: `bearer ${jwt}` };
        setUser({ ...userData, jwt });
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("Login failed:", error.message || "An error occurred");
        alert("Login failed. Please check your credentials.");
      }
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    removeUser();
    delete axios.defaults.headers.common["Authorization"];
    navigate("/", { replace: true });
  }, [navigate, removeUser]);

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
