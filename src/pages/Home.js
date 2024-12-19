import { useAuth } from "../context/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  return (
    <>
      <div className="container">
        <h1>This is home</h1>
        {user ? <a href="/dashboard">Go to Dashboard</a> : <a href="/login">Go to Login</a>}
      </div>
    </>
  );
}
