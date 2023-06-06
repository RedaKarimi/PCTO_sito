import { useNavigate, useLocation } from "react-router-dom";
import { Col, Row, Layout, Card, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "../../Men-shop/men-style.css"

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
                                    src={require("./kids-img/upK1.avif")}
                                    style={{ width: "100%", padding: "5%" }}/>
                                <Meta title="Polo regular fit in petit piqué di cotone" description="€55,00" className="textShop" />

                                <div class="buttonContainer">
                                    <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                                </div>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./kids-img/upK2.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Felpa in flanella di cotone biologico" description="€70,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./kids-img/upK3.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="T-shirt a girocollo di cotone" description="€30,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./kids-img/upK4.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Camicia con tasca a contrasto Lacoste" description="€60,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                    </Row>
                    <hr></hr>
                    <p class="titolo2">Lower Body, Higher quality</p>
                    <Row align="top" justify="center" gutter={[4, 8]}>
                        <Col span={5}>
                            <img
                                src={require("./kids-img/lowK1.avif")}
                                style={{ width: "100%", padding: "5%" }}
                            />
                            <Meta title="Pantaloni in gabardine elasticizzata Lacoste" description="€70,00" className="textShop" />

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./kids-img/lowK2.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Pantaloni in felpa di cotone spazzolato biologico" description="€50,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./kids-img/lowK3.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Bermuda in gabardina di cotone leggera Lacoste" description="€60,00" className="textShop" /></a>

                            <div class="buttonContainer">
                                <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                            </div>
                        </Col>
                        <Col span={5}>
                            <a href="">
                                <img
                                    src={require("./kids-img/lowk4.avif")}
                                    style={{ width: "100%", padding: "5%" }}
                                />

                                <Meta title="Pantaloni in taffetà a rombi Lacoste SPORT" description="€35,00" className="textShop" /></a>

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