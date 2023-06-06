import React, { useState } from "react";
import Login from "./Login"
import Register from "./Register"
import "./Account.css";
import { Form, Button, Tooltip, Input, Radio, Layout, Space, Menu, Image, } from "antd";
import Background from "./img/club.avif";

const { Content } = Layout;
const options = [
  {
    label: 'Login',
    value: 'Login',
  },
  {
    label: 'Register',
    value: 'Register',
  },
]

function Mail() {
  const [option, setOption] = useState('Login');
  const onChange3 = ({ target: { value } }) => {
    setOption(value);
  };
  return (
    <Layout style={{ marginTop: 100, marginBottom: -92 }}>
      <Content >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 850, backgroundImage: `url(${Background})`}}>
          <div style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "30%", height: "50%",  zIndex: 1, backgroundColor: "white", borderRadius: 10, boxShadow: "0 0 11px rgba(33,33,33,1)" }}>
            {option==="Login"?<Login />:<Register />}
            <Radio.Group style={{marginLeft:"35%",marginTop:"-7%"}} options={options} onChange={onChange3} value={option} optionType="button"/>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Mail;