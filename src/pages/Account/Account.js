import React, { useState, useEffect } from "react";
import Login from "./Login"
import {useLocation} from 'react-router-dom';
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

  const [hidden, setHidden] = useState(false);

  const setValHidden = (value) => {
    setHidden(value);
  };

  useEffect(() => {
    // Prevent scrolling when the component mounts
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0, { behavior: "smooth" });

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const state = useLocation();
  const {ifHidden}=state;
  return (
    <Layout style={{ overflowY: "hidden", marginTop: 100, bottom: -10, marginBottom: -92 }}>
      <Content>
      <div style={{ overflowY: "hidden", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 880,pbottom:1 }} className="bodyBackground">
          <div style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "30%", height: "60%" , zIndex: 1, backgroundColor: "white", borderRadius: 10, boxShadow: "0 0 11px rgba(33,33,33,1)" }}>
            {option === "Login" ? <Login /> : <Register SendgetValue={setValHidden} />}
            <Radio.Group style={{ marginLeft: "35%", marginTop: "-12  %" }} options={options} onChange={onChange3} value={option} optionType="button" />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Mail;