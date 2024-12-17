import { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_AUTH = "/api/auth/local";

export default function LoginPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrMsg(null);
      const response = await axios.postForm(URL_AUTH, formData);
      const token = response.data.jwt;
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };

      props.onLoginSuccess();
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      {!isLoading && (
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
      )}
    </div>
  );
}
