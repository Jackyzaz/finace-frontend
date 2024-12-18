import { Button, Space, Spin } from "antd";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

export default function ProfilePage() {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = () => {
    setIsLoading(true);
    try {
      logout();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="container">
          <Space
            direction="vertical"
            size="small"
            style={{
              display: "flex",
            }}
          >
            <h1>This is Profile</h1>
            <a href="/">Go to Home</a>
            <Button onClick={handleLogout}>Logout</Button>
          </Space>
        </div>
      </Spin>
    </>
  );
}
