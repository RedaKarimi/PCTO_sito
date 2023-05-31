import "./App.css";
import 'antd/dist/reset.css';
import { Form,Button, Tooltip,Input,Layout, Space, Menu, Image, } from "antd";
import { CSSTransition } from 'react-transition-group';
import {
  AppstoreOutlined,
  MailOutlined,
  SearchOutlined,
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import React, { useState,useRef } from "react";
import Axios from "axios";
const { Header, Content, Footer } = Layout;
const onSearch = (value) => console.log(value);

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

function App() {
  const [email, setEmail] = useState("");  
  const [isOnSearch, setIsOnSearch] = useState(false);
  const nodeRef = useRef(null);

  const sendEmail = () => {
    Axios.post("http://192.168.250.41:8080/email", {
      getEmail: email,
    }).then((response) => {
      console.log(response);
    });
  };
  return (
    <Layout className="elements">
      <Header style={{display: "flex",height: 105,margin: -10,color: "white",backgroundColor: "white",alignItems: "center", position:"fixed", top:0, left:10, right:0, zIndex: 1000, width:"100%"}}>
        <img
          src={require("./img/logoMigliore.png")}
          alt="test"
          width="6%"
        ></img>
          <Menu 
          style={{width: "100%",margin: 0,padding: 20,height: 0,display: "flex",justifyContent: "flex-end",alignItems: "center",}}
          disabledOverflow={true}
          theme={{
            token: {
              colorPrimary: '#005226',
            },
          }}
      
          mode="horizontal"
          breakpoint="lg"
          collapsedWidth="0"
          defaultSelectedKeys={["0"]}>
  
          <Menu.Item key="mail" className="modifica" style={isOnSearch===true?{marginTop:-20}:{marginTop: -15}} >
            <Tooltip title="search">
              <Button size="large" className="items" type="text" shape="circle" icon={<MailOutlined style={{fontSize:"23px", color:"black"}} />}  />
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="app" style={isOnSearch===true?{marginTop:-20}:{marginTop: -15}}>
          <Button  size="large" className="items" type="text" shape="circle" icon={<AppstoreOutlined style={{fontSize:"23px", color:"black "}}  />} />
          </Menu.Item>
          <Menu.Item key="shop" style={isOnSearch===true?{marginTop:-20}:{marginTop: -15}}>
          <Button  size="large" className="items" type="text" shape="circle" icon={ <ShoppingOutlined style={{fontSize:"23px", color:"black "}} />} />
          </Menu.Item>
          <Menu.Item  key="search">
            { isOnSearch &&
              (<Input placeholder="input search text" allowClear onSearch={onSearch} style={{borderColor:"#015335"}}/>
              )}
              <Button size="large" type="text" shape="circle" icon={ <SearchOutlined  style={{fontSize:"23px" }} />} onClick={()=>{setIsOnSearch(!isOnSearch)}} />
          </Menu.Item>
        </Menu> 
      </Header>
      <Content className="content">
        <div class="container">
          <div class="container1">
            <img
              class="immagine"
              src={require("./img/trophy.webp")}
              alt="test2"
            ></img>
          </div>
        </div>

        <div class="contenitore">
          <a href="#"><img src={require("./img/rglogo.png")} class="image1"/><p class="carousel">ROLAND GARROS</p></a>
          <a href="#"><img src={require("./img/model3.jpg")} class="image2"/><p class="carousel"> POLO & LUXURY</p></a>
        </div>

        <div class="caroselloImmagini">
            <img src={require("./img/poloOriginale.jpg")}></img>
            <img src={require("./img/poloTennis.jpg")}></img>
            <img src={require("./img/poloDonna.jpg")}></img>
            <img src={require("./img/completoTennisDonna.jpg")}></img>
        </div>
      </Content>
      <Footer className="footer">
        <div class="social">
          <InstagramOutlined className="icone" />
          <TwitterOutlined className="icone" />
          <FacebookOutlined className="icone" />
          <YoutubeOutlined className="icone" />
        </div>

        <table>
          <thead>
            <tr><th>Riguardo Lacoste</th><th>Categorie</th><th>Aiuto e Contatti</th><th>Unisciti al club Lacoste</th></tr>
          </thead>
          <tbody>
            <tr><td>ciao</td><td>ciao di nuovo</td><td>ciao 3</td><td>
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
          </tbody>
        </table>
      </Footer>
    </Layout>
  );
}

export default App;