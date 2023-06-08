import { ArrowDownOutlined } from "@ant-design/icons";
import "./history-style.css"
import { Layout } from "antd";
import React from "react";
const { Content } = Layout;

function History() {
    return (
        <Layout>
            <Content>
                <div class="container_history">
                    <video autoPlay loop muted id="video" class="video_history" >
                        <source src={require("./img-history/storia.mp4")} type="video/mp4"></source>
                    </video>

                    <div class="overlay_history">
                        <div class="text">THE STORY OF AN ETERNAL LOVE.<br /><br />
                            <ArrowDownOutlined onClick={() => { window.scrollTo({ top: 1950, behavior: 'smooth' }); }} style={{ fontSize: "43px", color: "white" }} className="icon" />                        </div>
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
                    <p class="titolo_rene">LA STORIA DI UN MITO</p>
                    <div class="allinea_rene">
                        <video autoPlay loop muted id="video" class="video_rene" >
                            <source src={require("./img-history/reneCroc.mp4")} type="video/mp4"></source>
                        </video>
                        <p class="descriptionRight">Boston, 1923, il giovane prodigio del tennis René Lacoste ha 19 anni e ama le sfide. Il capitano della squadra lo sa. Gli promette una bellissima valigia in pelle di coccodrillo che ammira in una vetrina se vince il match difficile che lo aspetta. René non vince, ma ha avuto la determinazione del coccodrillo sul campo, motivo per cui un giornalista americano gli ha dato questo soprannome.</p>
                    </div>
                </section>

                <section class="robertGeorge">
            
                </section>
            </Content>
        </Layout>
    );
}

export default History;