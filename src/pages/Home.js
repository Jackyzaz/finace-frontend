import { Col, Row, Space, Typography } from "antd";
import { useAuth } from "../context/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Space direction="vertical" style={{ width: "100%", textAlign: "center" }}>
            <h1 style={{ fontSize: "8vh" }}>Welcome to My Finance App</h1>
            <p style={{ fontSize: "4vh" }}>Manage your finances effectively with our modern tools and insights.</p>
            <p style={{ marginTop: "4vh", fontSize: "4vh" }}>
              {user ? <a href="/dashboard">Go to Dashboard</a> : <a href="/login">Go to Login</a>}
            </p>
          </Space>
        </Col>
      </Row>
    </>
  );
}
