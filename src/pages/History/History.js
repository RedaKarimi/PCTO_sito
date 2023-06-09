import { ArrowDownOutlined } from "@ant-design/icons";
import "./history-style.css"
import { Button, Layout,Image } from "antd";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useState } from "react";
const { Content } = Layout;

const History = ({SendValue}) => {
    let navigate = useNavigate();
    return (
        <Layout>
            <Content>
                <div class="container_history">
                    <video autoPlay loop muted id="video" class="video_history" >
                        <source src={require("./img-history/storia.mp4")} type="video/mp4"></source>
                    </video>

                    <div class="overlay_history">
                        <div class="text">THE STORY OF AN ETERNAL LOVE.<br /><br />
                            <ArrowDownOutlined onClick={() => { window.scrollTo({ top: 2000, behavior: 'smooth' }); }} style={{ fontSize: "43px", color: "white" }} className="icon" /> </div>
                    </div>
                </div>

                <section class="elevator">
                    <div class="box"></div>
                    <div class="box box2"></div>
                    <div class="box"></div>
                    <div class="box box2"></div>
                    <div class="box"></div>
                    <div class="box box2"></div>
                    <div class="box"></div>
                    <div class="box box2"></div>
                </section>

                <section class="rene_history">
                    <p class="titolo_rene">La storia di una leggenda</p>
                    <div class="allinea_rene">
                        <video autoPlay loop muted id="video" class="video_rene" >
                            <source src={require("./img-history/reneCroc.mp4")} type="video/mp4"></source>
                        </video>
                        <p class="descriptionRight">Boston, 1923, il giovane prodigio del tennis René Lacoste ha 19 anni e ama le sfide. Il capitano della squadra lo sa. Gli promette una bellissima valigia in pelle di coccodrillo che ammira in una vetrina se vince il match difficile che lo aspetta. René non vince, ma ha avuto la determinazione del coccodrillo sul campo, motivo per cui un giornalista americano gli ha dato questo soprannome.</p>
                    </div>
                </section>

                <section class="robertGeorge">
                    <div class="contenutiRobert">
                        <div><p class="titoloCoccodrillo">Nasce un'icona</p></div>
                        <div class="immagineETesto">
                            <p className="descrizioneSinistra">1927. Lo stilista Robert George si diverte a disegnare un coccodrillo e mostra i suoi schizzi al suo amico René Lacoste. Il campione di tennis non resiste al piacere di presentarsi con l'animale simbolo del suo riconoscimento internazionale... e se lo fa ricamare sul blazer bianco. Lo indossa prima di ogni partita. Non passerà inosservato.<br />Versatile. All'avanguardia. Il coccodrillo Lacoste è un'opera d'arte. Da quello disegnato da Robert George al logo di oggi, l'attitudine rimane. Questa è la forza di un acronimo che è passato alla storia. Sottile, il Coccodrillo passa nelle mani dei designer, si evolve passo dopo passo. Il risultato ? Un segno di rally che trascende le culture. E attraversare il tempo.</p>
                            <img src={require("./img-history/coccRobertGeorge.jpg")} class="immagineCoccodrillo" />
                        </div>
                    </div>
                </section>

                <section className="poloHistory">
                    <hr></hr>
                    <p className="titoloPolo">La polo L.12.12 - Inventato da Rene Lacoste</p>
                    <div className="elementsPolo">
                        <div className="videoPolo">
                            <video autoPlay loop muted id="video" style={{ width: "50%" }}>
                                <source src={require("./img-history/videoPolo.mp4")} type="video/mp4" />
                            </video>
                            <p className="textPolo">Inventata da Lacoste, la polo è una rivoluzione. Il suo nome? L per "Lacoste". 1 per “petit piqué”, 2 per “maniche corte” e 12 perché questo è il dodicesimo prototipo…. </p>
                        </div>

                        <div>
                            <img src={require("./img-history/poloItself.jpg")} style={{ width: "80%" }} />
                        </div>
                    </div>
                </section>

                <div className="containerVarious">
                    <video autoPlay loop muted id="video" className="video_presentazione">
                        <source src={require("./img-history/differentCroc.mp4")} type="video/mp4" />
                    </video>
                    <div className="overlayVarious">
                        <div className="testo">
                            UNA POLO, UN LOGO E TUTTO DIVENTA POSSIBILE.<br /><br />
                            SCOPRI LA NUOVA LINEA DI ABBIGLIAMENTO LACOSTE CLICCANDO SUL COCCODRILLO<br /><br /><br />
                            <Image style={{width:"12.5%"}} src={require("./img-history/logoMigliore.png")} onClick={() => { navigate('/men'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} preview={false} className="logoStoria" />
                        </div>
                    </div>
                </div>
                <Footer />
            </Content>
        </Layout>
    );
}

export default History; 