import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return (
      <>
        <div className="container">
          <h1>You Must Login First!</h1>
          <a href="/login">Go to Login</a>
        </div>
      </>
    );
  }
  return children;
};
