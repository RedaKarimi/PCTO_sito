import { useNavigate, useLocation } from "react-router-dom";
import { Col, Row, Layout, Card, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "../Men-shop/men-style.css"

const { Meta } = Card
const { Content, Footer } = Layout;
function womenShop() {
    return (
        <Layout style={{ marginTop: 100 }}>
            <Content style={{ display: "flex", justifyContent: "center" }} class="elementi">
                <section class="articoli">
                    <p class="titolo">Upper Body by Lacoste</p>
                    <Row align="top" justify="center" gutter={[4, 8]}>
                        <Col span={5}>
                            <div >
                                <img
                                    src={require("./women-img/upF1.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />
                                <Meta title="Polo regular fit in petit piqué di cotone" description="€110,00" className="textShop" />

                                <div class="buttonContainer">
                                    <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                                </div>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./women-img/upF2.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Felpa da donna in misto cotone con collo rotondo" description="€150,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./women-img/upF3.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Pullover a V in cotone biologico" description="€150,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./women-img/upF4.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Camicia oversize in popeline di cotone" description="€140,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                    </Row>
                    <hr></hr>
                    <p class="titolo2">Lower Body, High quality</p>
                    <Row align="top" justify="center" gutter={[4, 8]}>
                        <Col span={5}>
                            <img
                                src={require("./women-img/lowF1.avif")}
                                style={{ width: "100%", padding: "5%" }}
                            />
                            <Meta title="Pantaloni da donna in gabardina stretch" description="€175,00" className="textShop" />

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./women-img/lowF2.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Pantaloni sportivi in felpa di cotone organico" description="€110,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./women-img/lowF3.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Bermuda da golf in taffetà elasticizzato" description="€90,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./women-img/lowF4.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Jeans slim fit in denim di cotone stretch" description="€130,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                    </Row>
                </section>
            </Content>
            <Footer>
            </Footer>
        </Layout>
    );
}

export default womenShop;