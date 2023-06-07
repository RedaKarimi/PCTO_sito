import { useNavigate, useLocation } from "react-router-dom";
import { Col, Row, Layout, Card, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Axios from 'axios'
import "./men-style.css"

const { Meta } = Card
const { Content, Footer } = Layout;
function MenShop() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Axios.get("http://192.168.250.52:7777/get/data")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const items = (body_part) => {
        let item =[]
        data.forEach(element => {
            if(body_part==element.product_body_part&&element.category_id==2){
                item.push(
                    <Col span={5}>
                        <img alt=""
                            src={`data:image/jpeg;base64,${element.image_data}`}
                            style={{ width: "100%", padding: "5%" }}
                        />
                        <Meta title={`${element.product_name}`} description={`€${element.price}`} className="textShop" />
    
                        <div class="buttonContainer">
                            <button class="bottoneCarrello" style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
                        </div>
                    </Col>
                )
            }
        });
        return item
    }

    return (
        <Layout style={{ marginTop: 100 }}>
            <Content style={{ display: "flex", justifyContent: "center" }} class="elementi">
                <section class="articoli">
                    <p class="titolo">Upper Body by Lacoste</p>
                    <Row align="top" justify="center" gutter={[4, 8]}>
                        {items("UP")}
                    </Row>
               
                <hr></hr>
                    <p class="titolo2">Lower Body, Higher quality</p>
                    <Row align="top" justify="center" gutter={[4, 8]}>
                        {items("LOW")}
                    </Row>
                    </section>
            </Content>
            <Footer>
            </Footer>
        </Layout>
    );
}

export default MenShop;