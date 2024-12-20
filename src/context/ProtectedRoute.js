import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  if (!user) {
    return (
      <>
        <div className="container">
          {/* <h1>You Must Login First!</h1>
          <a href="/login">Go to Login</a> */}
        </div>
      </>
    );
  }
  return children;
};
