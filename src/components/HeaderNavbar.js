import { Button, Col, Menu, Row, Space } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { HomeOutlined, DashboardOutlined, SignalFilled } from "@ant-design/icons";
export default function HeaderNavbar() {
  const items = [
    { key: `/`, label: `Home`, icon: <HomeOutlined /> },
    { key: `/Dashboard`, label: `Dashboard`, icon: <DashboardOutlined /> },
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
    <Row justify="space-between" style={{ width: "100%" }}>
      <Col>
        <Space size="middle">
          <SignalFilled style={{ color: "white", fontSize: "2.5vh" }} />
          <p style={{ fontSize: "3vh", fontWeight: "bold", color: "white" }}>My Finace App</p>
        </Space>
      </Col>
      <Col>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          onClick={({ key }) => {
            navigate(key, { replace: true });
          }}
        />
      </Col>
      <Col>{user ? <Button onClick={handleLogout}>Logout</Button> : <Button onClick={handleLogin}>Login</Button>}</Col>
    </Row>
  );
}
