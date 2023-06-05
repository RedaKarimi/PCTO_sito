import React, { useState } from "react";
import { Form, Button, Tooltip, Input, Layout, Space, Menu, Image, } from "antd";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene"
import { PerformanceMonitor } from "@react-three/drei";
import round from 'lodash/round'
const { Header, Content, Footer } = Layout;

function Store() {
  const [dpr, setDpr] = useState(1);
  return (
    <Layout style={{ marginTop: 100 }}>
      <Content style={{backgroundColor:"white"}}>
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