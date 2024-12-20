import { Button, Col, Menu, Row, Space } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import {
  HomeOutlined,
  DashboardOutlined,
  SignalFilled,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";

export default function HeaderNavbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const items = [
    { key: `/`, label: `Home`, icon: <HomeOutlined /> },
    { key: `/dashboard`, label: `Dashboard`, icon: <DashboardOutlined /> },
  ];

  const userMenu = [
    {
      label: user && user.username,
      key: "SubMenu",
      icon: <UserOutlined />,
      children: [
        {
          label: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const loginMenu = [{ key: `/login`, label: `Login`, icon: <LoginOutlined /> }];

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
          selectedKeys="None"
          onClick={({ key }) => {
            navigate(key, { replace: true });
          }}
        />
      </Col>

      {/* User Section */}
      <Col style={{ width: "25vh", display: "flex", justifyContent: "flex-end" }}>
        {user ? (
          <Menu
            theme="dark"
            mode="horizontal"
            items={userMenu}
            style={{
              display: "inline-block",
            }}
            selectedKeys="None"
            onClick={handleLogout}
          />
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            items={loginMenu}
            style={{
              display: "inline-block",
              minWidth: "100px",
            }}
            selectedKeys="None"
            onClick={handleLogin}
          />
        )}
      </Col>
    </Row>
  );
}
