import { useNavigate, useLocation } from "react-router-dom";
import { Col, Row, Layout, Card, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Axios from 'axios'
import "./men-style.css"

import { toast } from 'react-toastify';
import Footer from "../Footer/Footer"

const { Meta } = Card
const { Content, } = Layout;
function MenShop({ User }) {
    const cachedUser = localStorage.getItem('user');
    useEffect(() => {
        if (cachedUser) {
            const user = JSON.parse(cachedUser);
            User = user
        }
    }, [])

    const [data, setData] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Axios.get("http://192.168.250.52:3000/get/data")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const toastId = React.useRef(null)
    const addToCart = (product_id) => {
        toastId.current = toast.loading("Please wait...")
        if (User.account_id === undefined) {
            navigate('/account')
            toast.update(toastId.current, {
                render: "You cant add items to your cart. You havent logged in",
                type: "error",
                autoClose: 2000,
                isLoading: false
            })
        } else {
            Axios.post('http://192.168.250.52:3000/put/items', {
                product_id:product_id,
                account_id:User.account_id,
                quantity:1
            }).then((response) => {
                console.log(response);
                toast.update(toastId.current, {
                    render: "Item has been to your added Shopping cart",
                    autoClose: 2000,
                    type: "success",
                    isLoading: false
                });
            }).catch((error) => {
                console.log(error.response.status)
                if (error) {
                    toast.update(toastId.current, {
                        render: "Something went wrong",
                        type: "error",
                        autoClose: 2000,

                        isLoading: false
                    })
                }
            })

        }
    }
    const items = (body_part) => {
        let item = []
        data.forEach(element => {
            if (body_part == element.product_body_part && element.category_id == 2) {
                item.push(
                    <Col span={5}>
                        <img alt=""
                            src={`data:image/jpeg;base64,${element.image_data}`}
                            style={{ width: "100%", padding: "5%" }}
                        />
                        <Meta title={`${element.product_name}`} description={`€${element.price}`} className="textShop" />

                        <div class="buttonContainer">
                            <button class="bottoneCarrello" onClick={()=>{addToCart(element.product_id)}} style={{ marginTop: "2.5%" }}>Aggiungi al carrello</button>
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
            <Footer />
        </Layout>
    );
}

export default MenShop;