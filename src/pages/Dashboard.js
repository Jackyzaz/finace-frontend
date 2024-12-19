import { useAuth } from "../context/useAuth";
import "../App.css";
import axios from "axios";
import Transaction from "../components/Transaction";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <div className="container">
        <Transaction user={user} />
      </div>
    </>
  );
}
