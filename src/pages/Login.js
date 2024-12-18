import { useState } from "react";
import { Button, Form, Input, Alert, Spin } from "antd";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const { login } = useAuth();
  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrMsg(null);
      login(formData);
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
      <Spin spinning={isLoading}>
        <div className="container">
          <h1>Login</h1>
          <Form onFinish={handleLogin} autoComplete="off">
            {errMsg && (
              <Form.Item>
                <Alert message={errMsg} type="error" />
              </Form.Item>
            )}
            <Form.Item
              label="Username"
              name="identifier"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
  );
}
