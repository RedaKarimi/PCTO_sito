import "./Footer.css";
import { Form,Input,Layout } from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import React, { useState,useRef } from "react";
import Axios from "axios";
const { Footer } = Layout;

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  types: {
    email: 'This email is not valid'
  },
};
/* eslint-enable no-template-curly-in-string */
const onFinish = (values) => {
  console.log(values);
};

function FooterComp() {
  const [email, setEmail] = useState("");
  const sendEmail = () => {
    Axios.post("http://192.168.250.41:8080/email", {
      getEmail: email,
    }).then((response) => {
      console.log(response);
    });
  }
  return (
    <Footer className="footer">
        <div class="social">
          <a href="https://www.instagram.com/lacoste/"><InstagramOutlined className="icone" /></a>
          <a href="https://twitter.com/Lacoste"><TwitterOutlined className="icone" /></a>
          <a href="https://www.facebook.com/Lacoste/"><FacebookOutlined className="icone" /></a>
          <a href="https://www.youtube.com/@Lacoste"><YoutubeOutlined className="icone" /></a>
        </div>

        <table>
          <thead>
            <tr><th>Riguardo Lacoste</th><th>Categorie</th><th>Aiuto e Contatti</th><th>Unisciti al club Lacoste</th></tr>
          </thead>
          <tbody>
            <tr><td><a href="https://www.lacoste.com/it/leclublacoste.html#">Le club Lacoste</a></td><td><a href="https://www.lacoste.com/it/uomo.html">Collezione Uomo</a></td><td><a href="https://www.lacoste.com/it/FAQ.html?category=C05&question=">FAQ</a></td><td>
            <Form
            className="inserimentoMail"
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
            <Form.Item name={['user', 'email']} rules={[{ type: 'email' }]}>
            <Input className="cellaMail"
            placeholder="La tua e-mail" allowClear onChange={(e) => {setEmail(e.target.value)}}
            onPressEnter={sendEmail} style={{ width: 200, borderRadius: "50px", border: "none"}} 
            />
            </Form.Item>
            <button class="inserimentoDati" onClick={sendEmail} >Iscriviti</button>
            </Form>
              </td></tr>
              <tr><td class="celleUguali"><a href="https://corporate.lacoste.com/">Il gruppo Lacoste</a></td><td class="celleUguali"><a hred="https://www.lacoste.com/it/donna.html">Collezione Donna</a></td><td class="celleUguali"><a href="https://www.lacoste.com/it/contactus">Telefono</a></td></tr>
              <tr><td class="celleUguali"><a href="https://www.lacoste.com/it/brand-protection.html">Protezione del marchio</a></td><td class="celleUguali"><a href="https://www.lacoste.com/it/bambino.html">Collezione Bambino</a></td><td class="celleUguali"><a href="https://www.lacoste.com/it/contactus">Email</a></td></tr>
          </tbody>
        </table>
      </Footer>
  );
}
export default FooterComp;