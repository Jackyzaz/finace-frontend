import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";
const AuthContext = createContext();

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_AUTH = "/api/auth/local";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      const response = await axios.post(URL_AUTH, formData);
      const { jwt, user: userData } = response.data;
      axios.defaults.headers.common = { Authorization: `bearer ${jwt}` };
      setUser({ ...userData, jwt });
      navigate("/profile", { replace: true });
    } catch (error) {
      console.error("Login failed:", error.message || "An error occurred");
      alert("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/", { replace: true });
  };

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


