import { Button, Col, Menu, Row, Space } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { HomeOutlined, DashboardOutlined, SignalFilled } from "@ant-design/icons";

export default function HeaderNavbar() {
  const items = [
    { key: `/`, label: `Home`, icon: <HomeOutlined /> },
    { key: `/dashboard`, label: `Dashboard`, icon: <DashboardOutlined /> },
  ];
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };
  const handleLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        width: "100%",
        padding: "0 20px",
        backgroundColor: "#001529",
        height: "64px",
      }}
    >
      {/* Logo Section */}
      <Col>
        <Space size="middle">
          <SignalFilled style={{ color: "white", fontSize: "2.5vh" }} />
          <p style={{ fontSize: "3vh", fontWeight: "bold", color: "white", margin: 0 }}>My Finace App</p>
        </Space>
      </Col>

      {/* Menu Section */}
      <Col flex="auto" style={{ textAlign: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{
            display: "inline-block",
          }}
          onClick={({ key }) => {
            navigate(key, { replace: true });
          }}
        />
      </Col>

      {/* User Section */}
      <Col>
        {user ? (
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Col>
    </Row>
  );
}
