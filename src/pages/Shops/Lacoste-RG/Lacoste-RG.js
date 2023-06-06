import { useNavigate, useLocation } from "react-router-dom";
import { Col, Row, Layout, Card, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./RG-style.css"

const { Meta } = Card
const { Content, Footer } = Layout;
function MenShop() {
    return (
        <Layout style={{ marginTop: 100 }}>
            <Content >
                <div class="container">
                    <video autoPlay loop muted id="video" class="immagine" >
                        <source src={require("./RG-img/RG.mp4")} type="video/mp4" />
                    </video>
                    <div class="overlay">
                        <div class="loghi" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "100%" }}>
                            <img src={require("./RG-img/atp.png")} class="atpLogo" style={{ width: "10%" }} />
                            <img src={require("./RG-img/rglogo.png")} class="rgLogo" style={{ width: "10%" }} />
                            <img src={require("./RG-img/logoLacoste.png")} class="lacosteLogo" style={{ width: "10%" }} />
                        </div>
                    </div>
                </div>
            </Content>
            <Footer>
            </Footer>
        </Layout>
    );
}

export default MenShop;