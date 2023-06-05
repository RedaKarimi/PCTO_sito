import { useNavigate, useLocation } from "react-router-dom";
import { Col, Row, Layout, Card, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./men-style.css"

const { Meta } = Card
const { Content, Footer } = Layout;
function MenShop() {
    return (
        <Layout style={{ marginTop: 100 }}>
            <Content style={{ display: "flex", justifyContent: "center" }} class="elementi">
                <section class="articoli">
                    <p class="titolo">Upper Body by Lacoste</p>
                    <Row align="top" justify="center" gutter={[4, 8]}>
                        <Col span={5}>
                            <img
                                src={require("./men-img/poloOriginale.jpg")}
                                style={{ width: "100%", padding: "5%" }}
                            />
                            <Meta title="Polo originale L.12.12" description="€110,00" className="textShop" />

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./men-img/felpaLogo.jpg")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Felpa Lacoste Girocollo in Cotone" description="€160,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./men-img/pimaCotton.jpg")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="T-shirt a girocollo di cotone Pima" description="€60,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./men-img/camicia.jpg")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Camicia in cotone regular fit" description="€120,00" className="textShop" /></a>

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
                                src={require("./men-img/pantsProva1.avif")}
                                style={{ width: "100%", padding: "5%" }}
                            />
                            <Meta title="Pantaloni skinny fit in cotone stretch" description="€130,00" className="textShop" />

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./men-img/pantsProva2.avif")}
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
                                    src={require("./men-img/pantsProva3.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Pantaloni corti in felpa di cotone spazzolato organico" description="€75,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./men-img/pantsProva4.avif")}
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

export default MenShop;