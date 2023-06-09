import React, { useState, startTransition, Suspense, useEffect } from "react";
import { Col, Row, Layout, Space, Card, Button, Divider, FloatButton } from "antd";
import { Canvas } from "@react-three/fiber";
import { ExclamationCircleOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Scene from "./Scene";
import { PerformanceMonitor } from "@react-three/drei";
import round from 'lodash/round'
import getPlacements from "antd/es/_util/placements";
import "./store-style.css";
import { toast } from 'react-toastify';
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
function Store({ User }) {
  const [dpr, setDpr] = useState(1);
  const [visible, setVisible] = useState(true);

  const handleVisibleChange = () => {
    startTransition(() => {
      setVisible(false);
    });
  };

  
  const [data, setData] = useState([]);
  let navigate = useNavigate();
  const fetchData = () => {

    console.log(User.account_id);
    Axios.get("http://192.168.250.52:3000/get/items", {
    account_id: User.account_id
  })
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
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
        product_id: product_id,
        account_id: User.account_id,
        quantity: 1
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
  const removeToCart = (product_id) => {
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
      Axios.post('http://192.168.250.52:3000/remove/item', {
        product_id: product_id,
        account_id: User.account_id,
        quantity: 1
      }).then((response) => {
        console.log(response);
        toast.update(toastId.current, {
          render: "Item has been to removed your Shopping cart",
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
  const items = () => {
    let item = []
    data.forEach(element => {
            item.push(
              <Row align="middle" justify="left" gutter={[16, 8]} style={{ padding: "5% 0 5% 5%" }}>
              <img src={`data:image/jpeg;base64,${element.image_data}`} style={{ width: "30%", borderRadius: "5px" }} />

              <Col className="attributesArticles" style={{ marginBottom: "20px" }}>
                <div className="descriptionContainer">
                  <p class="articleDescriprion">{element.product_name}</p>
                  <p class="articleDescriprion">{element.price}</p>
                </div>
              </Col>
              <Col className="numberArticles" style={{ marginBottom: "20px" }}>
                <div className="buttonsArticles" style={{ display: "flex", alignItems: "center" }}>
                  <Button size="large" type="text" shape="circle" onClick={() => {addToCart(element.product_id);fetchData()}} icon={<PlusOutlined style={{ fontSize: "28px", color: "black " }} />} />
                  <p style={{ paddingLeft: "15%", paddingRight: "15%", color: "black", fontSize: "20px" }}>{element.quantity}</p>
                  <Button size="large" type="text" shape="circle" onClick={() => {removeToCart(element.product_id);fetchData()}} icon={<MinusOutlined style={{ fontSize: "28px", color: "black " }} />} />
                </div>
              </Col>
            </Row>
            )
    });
    return item
}

  function el_manichino() {

    return <Suspense fallback={<div style={{ backgroundColor: "white", height: 700, width: "50%" }}></div>}>
      {visible ? (
        <FloatButton
          onClick={handleVisibleChange}
          style={{ position: "relative" }}
          icon={<ExclamationCircleOutlined />}
          tooltip={
            <div placement="right">
              Disclaimer: This 3D model is for style combination demonstration purposes only and does not reflect
              reality. The responsibility for the interpretation and use of the generated content lies solely with
              the user.
            </div>
          }
        />
      ) : (
        ""
      )}
      <Canvas dpr={dpr} style={{ backgroundColor: "white", height: 700, width: "50%" }}>
        <PerformanceMonitor factor={1} onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))}>
          <Scene />
        </PerformanceMonitor>
      </Canvas></Suspense>;
  }

  return (
    <Layout style={{ marginTop: "5%" }}>
      <Content style={{ backgroundColor: "#b7e4c7" }}>
        <div className="articoliCol" style={{ display: "flex", marginLeft: "auto", marginRight: "auto", width: "40%", Index: 1, backgroundColor: "white", boxShadow: "0 0 11px rgba(33,33,33,1)", marginTop: "5%", marginBottom: "5%", borderRadius: "10px" }}>
          <Space direction="vertical" size="middle" style={{ position: "relative", backgroundColor: "white", display: 'flex', borderRadius: "10px", }}>
              {items}
            <hr></hr>
            <div class="costoTotale">
              <p className="textAcquisto">Costo totale: €1200</p>
              <button className="buttonAcquista">Acquista</button>
            </div>
          </Space>
        </div>
      </Content>
    </Layout>
  );
}

export default Store;
