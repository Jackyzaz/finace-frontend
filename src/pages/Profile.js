import { Button, Space } from "antd";
import { useAuth } from "../context/useAuth";

export default function ProfilePage() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
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
    </>
  );
}
