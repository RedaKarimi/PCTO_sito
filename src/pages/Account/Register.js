import React from 'react';
import "./Account.css";
import { LockOutlined, UserOutlined,MailOutlined} from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { SHA3 } from 'sha3';
import Axios from 'axios'

const validateMessages = {
  types: {
    email: 'This email is not valid'
  },
};

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const register = () => {
    Axios.post("http://10.0.2.2:3001/register", {
      username: username,
      email: email,
      password: password,
      password_hashed:hash_password() 
    }).then((response) => {
      console.log(response);
    });
  };
  function hash_password(password){
    const hash = new SHA3(512)
    hash.update(password)
    return hash.digest("hex")
  }
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      validateMessages={validateMessages}
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
        <Input onChange={(e) => {setUsername(e.target.value)}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder=" Username" />
      </Form.Item>
      <Form.Item name={['user', 'email']} rules={[{ type: 'email' },{
            required: true,
            message: 'Please input your Emai!',
          },]}>
        <Input onChange={(e) => {setEmail(e.target.value)}} prefix={<MailOutlined className="site-form-item-icon" />} placeholder=" Email" />
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
          placeholder=" Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>I agree all statements in</Checkbox>
        </Form.Item>
        
        <a className="login-form-forgot" href="">
        terms of service
        </a>
      </Form.Item>
      <Form.Item>
        <button class="login-form-button" onClick={()=>console.log(hash_password(password))}>Register</button>
      </Form.Item>
    </Form>
  );
};
export default Register;