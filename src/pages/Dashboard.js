import { Button } from "antd";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

export default function DashboardPage() {
  const {logout} = useAuth()
  const [isLoading , setIslodaing] = useState(false)
  const handleLogout = () => {
    try {
      setIslodaing(true)
      logout()
    } catch (err) {
      console.log(err)
    } finally {
      setIslodaing(false)
    }
  }
  return (
    <>
    <div className="container">
      <h1>This is Dashboard1234</h1>
      <Button type="primary" onClick={handleLogout}>Logout</Button>
    </div>
    </>
  );
}
