import React, { useState } from "react";
import { Form, Button, Tooltip, Input, Layout, Space, Menu, Image,FloatButton } from "antd";
import { Canvas } from "@react-three/fiber";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Scene from "./Scene"
import { PerformanceMonitor } from "@react-three/drei";
import round from 'lodash/round'
import getPlacements from "antd/es/_util/placements";
const { Header, Content, Footer } = Layout;

function Store() {
  const [dpr, setDpr] = useState(1);
  const [visible,setVisible]=useState(true)
  return (
    <Layout style={{ marginTop: 100 }}>
      <Content style={{backgroundColor:"white"}}>
     {visible? <FloatButton onClick={()=>setVisible(false)} style={{position:"absolute",right:"92%",top:"80%"}} icon={<ExclamationCircleOutlined />} 
      tooltip={<div placement="right">Disclaimer: This 3D model is for style combination demonstration purposes only and does not reflect reality.
      The responsibility for the interpretation and use of the generated content lies solely with the user.</div>} />:""}
        <Canvas  dpr={dpr} style={{backgroundColor:"white", height:700,width:"50%"}} >
        <PerformanceMonitor factor={1} onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))} >
          <Scene />
          </PerformanceMonitor>
        </Canvas>
      </Content>
    </Layout>
  );
}

export default Store;