import React, { useEffect } from "react";
import { Button, Layout, Checkbox, Form, Input } from 'antd';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Cock from "./img/Cockodrillo.svg";

const { Content } = Layout;

function Profile({User}) {
  const cachedUser = localStorage.getItem('user');
  useEffect(() => {
    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      User=user
    }
  }, [])
  
  console.log(User.is_admin)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0, { behavior: "smooth" });
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  let admin = `${User.is_admin}`
  return (
    <Layout style={{ overflowY: "hidden", marginTop: 100, bottom: -10, marginBottom: -92 }}>
      <Content>
        <div style={{ overflowY: "hidden", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 880, pbottom: 1 }} className="bodyBackground">
          <div style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "30%", height: "60%", zIndex: 1, backgroundColor: "white", borderRadius: 10, boxShadow: "0 0 11px rgba(33,33,33,1)" }}>
            <div className="contenitoreLogoProfilo">
              <img src={Cock} className="logoProfilo" />
            </div>
            <div className="contenitoreInformazioniProfilo">
              <p className="testoProfilo">Username: {User.username}</p>
              <p className="testoProfilo">Password: {User.password}</p>
              <p className="testoProfilo">Registration Date: {User.registration_date.substring(0, 10)}</p>
              <p className="testoProfilo">Account ID: {User.account_id}</p>
              <p className="testoProfilo">IS ADMIN: {admin}</p>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Profile;