import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Account.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { Form, Checkbox, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = ({ sendUser }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = useState(
    {
      account_id: "",
      cart_id: "",
      username: "",
      password: "",
      is_admin: false,
      registration_date: "",
    }
  );
  const setUserPromise = (newUser) => {
    return new Promise((resolve) => {
      setUser(newUser);
      resolve(newUser);
    });
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0, { behavior: "smooth" });
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const toastId = useRef(null)
  const cacheUserLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  let navigate = useNavigate();
  const login = () => {
    toastId.current = toast.loading("Please wait...")
    if (!username || username === 'undefined' || username === 'null') {
      toast.update(toastId.current, { render: `Username/password field must not be empty`, type: "error", autoClose: 2000, isLoading: false })
      return;
    }
    if (!password || password === 'undefined' || password === 'null') {
      toast.update(toastId.current, { render: `Username/password field must not be empty`, type: "error", autoClose: 2000, isLoading: false })
      return;
    }
    Axios.post("http://192.168.250.52:3000/login", {
      username: username,
      password: password,
    }
    ).then((response) => {
      if (response.status === 200) {
        console.log("non error")
        toast.update(toastId.current, {
          render: "You have successfuly logged in. You're in your profile now",
          autoClose: 2000,
          type: "success",
          isLoading: false
        });
        setUserPromise({
          account_id: response.data[0].account_id,
          cart_id: response.data[0].cart_id,
          username: response.data[0].username,
          password: response.data[0].password,
          is_admin: response.data[0].is_admin===0?false:true,
          registration_date: response.data[0].registration_date
        }).then((user)=>{
          cacheUserLogin(user);
          sendUser(user)
        })
        navigate('/')
      }
    }).catch((error) => {
      console.log("error");
      if (error) {
        toast.update(toastId.current, {
          render: "Something went wrong",
          type: "error",
          autoClose: 2000,

          isLoading: false
        })
        if (error.response.status === 404) {
          toast.update(toastId.current, {
            render: "Server is not open",
            type: "error",
            autoClose: 2000,
            isLoading: false
          })
        }
        else if (error.response.status === 405) {
          toast.update(toastId.current, {
            render: "Invalid username or password.",
            type: "error",
            autoClose: 2000,
            isLoading: false
          })
        } else {
          toast.update(toastId.current, {
            render: `Login Failed ERROR:${error.response.status}`,
            type: "error",
            autoClose: 2000,
            isLoading: false
          })
        }
      }
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
        <Input onChange={(e) => { setUsername(e.target.value) }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
        <Input.Password
          onChange={(e) => { setPassword(e.target.value) }}
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
        <button class="login-form-button" onClick={login}>Login</button>
      </Form.Item>
    </Form>
  );
};
export default Login;