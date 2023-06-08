import React from 'react';
import "./Account.css";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Axios from 'axios'

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    Axios.post("http://10.0.2.2:3001/register", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input onChange={(e) => {setUsername(e.target.value)}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          onChange={(e) => {setPassword(e.target.value)}}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <button class="login-form-button" onClick="login">Login</button>
      </Form.Item>
    </Form>
  );
};
export default Login;