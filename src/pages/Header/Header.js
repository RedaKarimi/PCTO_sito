import { useNavigate,useLocation } from "react-router-dom";
import './Header.css';
import 'antd/dist/reset.css';
import { Form,Button, Tooltip,Input,Layout, Space, Menu, Image, } from "antd";
import {
  AppstoreOutlined,
  HomeOutlined,
  MailOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Animate from 'rc-animate';
import React, { useState,useRef, createContext } from "react";
const { Header } = Layout;
const onSearch = (value) => console.log(value);
function HeaderComp() {
  const [isOnSearch, setIsOnSearch] = useState(false);
  const [animateHeight, setAnimateHeight] = useState(0);

  let navigate = useNavigate();
  const location = useLocation();

  const toggleSearch = () => {
    setIsOnSearch(!isOnSearch);
    setAnimateHeight(isOnSearch ? 0 : 32);
  };
  return (
    <Header className="header">
        <img src={require("./logoMigliore.png")} alt="test" width="6%" />
        <img src={require("./scrittaLacoste.png")} alt="logo" width="6%" />
          <Menu 
          style={{ width: "100%", margin: 0,padding: 20,height: 0,display: "flex",justifyContent: "flex-end",alignItems: "center",}}
          disabledOverflow={true}
          mode="horizontal"
          breakpoint="lg"
          collapsedWidth="0"
          defaultSelectedKeys={["0"]}
          theme={{
            token: {
              colorPrimary: '#005226',
            },
          }} >
  
          <Menu.Item key="mail" >
            <Tooltip title="search">
            { location.pathname=="/mail" &&
                (<Button  size="large"  type="text" shape="circle" onClick={()=>{navigate('/');}} icon={ <HomeOutlined  style={{fontSize:"23px", color:"#13603C"}} />} />
                )||
                (<Button size="large"  type="text" shape="circle" onClick={()=>{navigate('/mail');}} icon={<MailOutlined style={{fontSize:"23px", color:"black"}} />}  /> ) 
            }
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="app" >
            { location.pathname=="/app" &&
                (<Button  size="large"  type="text" shape="circle" onClick={()=>{navigate('/');}} icon={ <HomeOutlined  style={{fontSize:"23px", color:"#13603C"}} />} />
                )||
                (<Button  size="large"  type="text" shape="circle" onClick={()=>{navigate('/app');}} icon={<AppstoreOutlined style={{fontSize:"23px", color:"black "}}  />} /> ) 
            }
          </Menu.Item>
          <Menu.Item key="shop" >
            { location.pathname=="/store" &&
                (<Button  size="large"  type="text" shape="circle" onClick={()=>{navigate('/');}} icon={ <HomeOutlined  style={{fontSize:"23px", color:"#13603C"}} />} />
                )||
                (<Button  size="large"  type="text" shape="circle" onClick={()=>{navigate('/store');}} icon={ <ShoppingOutlined style={{fontSize:"23px", color:"black "}} />} /> ) 
            }
          </Menu.Item>
          <Menu.Item key="search">
          <Animate
          transitionEnter={true}
          transitionLeave={true}
          transitionName="fade"
        >
            { isOnSearch ?
                <Input key="1" placeholder="input search text" allowClear onSearch={onSearch} 
                style={{ top:-3 ,borderColor:"#13603C",  border: "",width: "fit-content",maxWidth:150}}/>
              :null
            }
            </Animate>
              <Button style={{ top:1 }}   size="large" type="text" shape="circle" icon={ <SearchOutlined  style={{fontSize:"23px" }} />} onClick={()=>{setIsOnSearch(!isOnSearch)}} />
          </Menu.Item>
        </Menu> 
      </Header>
  );
}export default HeaderComp;