import "./home.css";
import 'antd/dist/reset.css';
import { Form,Button, Tooltip,Input,Layout, Space, Menu, Image, } from "antd";
import { CSSTransition } from 'react-transition-group';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';
import QueueAnim from 'rc-queue-anim';
import BannerAnim, { Element } from 'rc-banner-anim';
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
import React, { useState,useRef, createContext } from "react";
import Axios from "axios";
const { Header, Content, Footer } = Layout;


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

function Home() {
  const [email, setEmail] = useState("");  
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
      <Content className="content">
        
        <div class="container">
          <div class="immagine">
            <div class="overlay">
              <div class="text">Lacoste X Roland Garros 2023<br/><br/><button class="buttonDjokovic">VAI ALLA COLLEZIONE</button><br/><br/><img src={require("./img/rglogo.png")} class="crocBanner" style={{width: "10%"}}/></div>
            </div>
          </div>
        </div>

        <section class="orangeDivider">
        <OverPack style={{ overflow: 'hidden', height:700}} >
        <TweenOne key="0" animation={{ opacity: 1 }} className="imgAndText" style={{ opacity: 0, marginBottom: -10 }}/>
          <QueueAnim key="queue"
            leaveReverse
            style={{  left: '1%', marginLeft: -200 }}
          >
          <h2 key="a"   style={{paddingLeft: "11.5%"}} >We are Lacoste</h2>
          <div key="b" className="imgAndText">
            <img src={require("./img/weAreLacoste.jpg")} style={{marginTop: "1.5%", width: "60%", paddingLeft: "11.5%"}}/>
            <div class="sideElements">
              <p class="title">SEMPLICITA' ED IMMORTALITA'</p>
               <p class="sideText">Da oltre 90 anni, la nostra casa di abbigliamento, sulle orme dei grandi René Lacoste e André Giller, porta avanti uno stile immortale e rimasto immutato nel tempo, in grado di comunicare semplicità, eleganza e raffinatezza
               </p>
              <br/> 
              <p class="sideText">Il coccodrillo, simbolo della casa francese, viene applicato a caldo sugli indumenti. Il classico logo è rimasto immutato negli anni, tranne l'aver subito una leggera riduzione di dimensioni negli ultimi decenni.
              </p>
              <button class="bottoneStoria">Scopri di piu'</button>
              </div>
          </div>
          </QueueAnim>
          </OverPack>
        </section>
        <section class="polo">
        <OverPack style={{overflow: 'hidden',height:700}} >
          <TweenOne key="0" animation={{ opacity: 1 }} className="imgAndText2" style={{ opacity: 0, marginBottom: -10 }}/>
          <QueueAnim key="queue"
            leaveReverse
            style={{ right: '10%', marginRight: -200 }}
          >   
          <h2 key="a" style={{paddingRight: "15%"}} className="titoloH2">POLO ORIGINAL L.12.12</h2>
          <div key="b" className="imgAndText2 ">
            <img src={require("./img/poloAndLogo.jpg")} style={{width: "60%", marginTop: "2.5%", float: "right", paddingRight: "15%", marginLeft: "3%"}}/>
            <div class="leftElements">
              <p class="leftTitle">L'ICONA</p>
              <p class="leftText">Dal 1933, grazie al gusto e al magico tocco di René Lacoste, la nostra polo, conosciuta come "L.12.12", è ormai al giorno d'oggi un'istituzione. Inoltre, da oggi il coccodrillo si fa strada nella tua serie tv preferita permettendoti di scegliere di ampliare il tuo guardaroba grazie a Lupin,
               Stranger Things, La casa di Carta e tante altre serie tv</p>
              <br/><button class="bottonePolo">Acquista subito</button>
            </div>
          </div>
          </QueueAnim>
          </OverPack>
        </section>
        <hr></hr>
        <div class="contenitore">
          <a href="#"><img src={require("./img/djokovicPose.jpg")} class="image1"/><p class="carousel">LACOSTE X DJOKOVIC</p></a>
          <a href="#"><img src={require("./img/model3.jpg")} class="image2"/><p class="carousel"> POLO & LUXURY</p></a>
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
            <tr><td><a href="#">Le club Lacoste</a></td><td><a href="#">Collezione Uomo</a></td><td><a href="#">FAQ</a></td><td>
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
              <tr><td class="celleUguali"><a href="#">Il gruppo Lacoste</a></td><td class="celleUguali"><a hred="#">Collezione Donna</a></td><td class="celleUguali"><a href="#">(+39) 02 385 940 58</a></td></tr>
              <tr><td class="celleUguali"><a href="#">Protezione del marchio</a></td><td class="celleUguali"><a href="#">Collezione Bambino</a></td><td class="celleUguali"><a href="#">(+39) 02 385 940 58</a></td></tr>
          </tbody>
        </table>
      </Footer>
    </Layout>
  );
}

export default Home;  