import { Button, Col, Menu, Row, Space } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";

export default function HeaderNavbar() {
  const items = [
    { key: `/`, label: `Home` },
    { key: `/Dashboard`, label: `Dashboard` },
  ];
  const navigate = useNavigate();
  const { login, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };
  const handleLogin = () => {
    navigate("/login", { replace: true });
  };
  return (
    <Row justify="space-between" style={{ width: "100%" }}>
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
