import { useState } from "react";
import { Button, Form, Input, Alert, Checkbox, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const { login } = useAuth();

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrMsg(null);
      const rememberMe = formData.rememberMe || false;
      await login({ ...formData, rememberMe });
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            width: 500,
            padding: "40px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>
          <Form onFinish={handleLogin} autoComplete="off" layout="vertical">
            {errMsg && (
              <Form.Item>
                <Alert message={errMsg} type="error" />
              </Form.Item>
            )}
            <Form.Item
              label="Username"
              name="identifier"
              rules={[{ required: true, message: "Please enter your username!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
            </Form.Item>
            <Form.Item name="rememberMe" valuePropName="checked" initialValue={true}>
              <Checkbox>Remember Me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: "100%" }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
}
