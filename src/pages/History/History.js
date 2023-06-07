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
                </div>
            </Content>
        </Layout>
    );
}

export default History;