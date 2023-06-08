import React, { useRef, useState } from 'react';
import './Account.css';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SHA3 } from 'sha3';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validateMessages = {
  types: {
    email: 'This email is not valid',
  },
};

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = ({ SendgetValue, SendError }) => {
  const [form] = Form.useForm();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [hidden, setHidden] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errormsg, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const toastId = useRef(null)

  let navigate = useNavigate();
  const register = () => {
    const hashedPassword = hash_password(password);
    toastId.current = toast.loading("Please wait...")
    if (hashedPassword) {
      Axios.post('http://192.168.250.52:3000/register', {
        username: username,
        email: email,
        password: password,
        hashedPassword: hashedPassword,
      }
      ).then((response) => {
        console.log(response);
        navigate('/verification',{state:{ email: email }});
      }).catch((error) => {
        if (error) {
          toast.update(toastId.current, {
            render: "Something went wrong",
            type: "error",
            autoClose: 2000,
            
            isLoading: false
          })
        }
        else if (error.response.status === 404) {
          toast.update(toastId.current, {
            render: "Server is not open",
            type: "error",
            autoClose: 2000,
            isLoading: false
          })
        } 
        else if (error.response.status === 409) {
          toast.update("Account already taken", {
            render: "Account already taken",
            type: "error",
            autoClose: 2000,
            isLoading: false
          })
        } else {
          toast.update("Registration Failed", {
            render: "Registration Failed",
            type: "error",
            autoClose: 2000,
            isLoading: false
          })
        }
      });
    } else {
      console.error('Error: Unable to hash password.');
    }
  };
  const hash_password = (password) => {
    try {
      const hash = new SHA3(512);
      hash.update(password);
      return hash.digest('hex');
    } catch (error) {
      console.error('Error: Unable to hash password.');
      return null;
    }
  };
  const changeState = () => {
    SendgetValue(true);
  };
  const beforeSubmit = async () => {
    try {
      if (agreeTerms) {
        register();
      } else {
        console.error('Error: Please agree to the terms of service.');
      }
    } catch (error) {
      console.error('Error: Form validation failed.');
    }
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      validateMessages={validateMessages}
      onFinish={beforeSubmit}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
          {
            min: 4,
            message: 'Please input at least 4 characters',
          },
        ]}
      >
        <Input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"

        />
      </Form.Item>
      <Form.Item
        name={['email']}
        rules={[
          {
            type: 'email',
            message: 'This email is not valid',
          },
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
          {
            pattern: PWD_REGEX,
            message:
              'A password contains at least eight characters, including at least one number and includes both lower and uppercase letters and special characters, for example #, ?, !.',
          },
        ]}
      >
        <Input.Password
          onClick={() => {
            setHidden(false);
            console.log(hidden);
            changeState(hidden);
          }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      {!hidden && (
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your Password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            onChange={(e) => {
              setConPassword(e.target.value);
            }}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
          />
        </Form.Item>
      )}

      <Form.Item
        name="terms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) => {
              if (value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Please agree to the terms of service.'));
            },
          },
        ]}
      >
        <Checkbox onChange={(e) => setAgreeTerms(e.target.checked)}>
          I agree to all statements in terms of service
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <div style={{ color: 'red', marginLeft: '25%' }}>
          {errormsg}
        </div>
        <button className="login-form-button" htmlType="submit">
          Register
        </button>
      </Form.Item>
    </Form>
  );
};

export default Register;