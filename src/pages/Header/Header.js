import { useNavigate, useLocation } from "react-router-dom";
import './Header.css';
import { Button, Tooltip, Input, Layout, Menu, ConfigProvider } from "antd";
import { TagOutlined, HomeOutlined, UserAddOutlined, SearchOutlined, ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
import TweenOne from 'rc-tween-one';
import Cock from "./Cockodrillo.svg"
import React, { useState } from "react";
const { Header } = Layout;
var TweenOneGroup = TweenOne.TweenOneGroup;
const onSearch = (value) => console.log(value);
function HeaderComp() {
  const [isOnSearch, setIsOnSearch] = useState(false);

  let navigate = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState('cat1');

  let submenu_items = new Map([
    [0, location.pathname === "/men" ?
      (<Menu.Item onClick={() => { navigate('/'); }} key="home" style={{ color: "#13603C", left: "auto", right: 0 }}>
        Home
      </Menu.Item>) : 
      (<Menu.Item onClick={() => { navigate('/men'); }} key="cat1" style={{ left: "auto", right: 0 }}>
        Uomo
      </Menu.Item>)
    ],
    [1, location.pathname === "/women" ?
      (<Menu.Item onClick={() => { navigate('/'); }} key="home" style={{ color: "#13603C", left: "auto", right: 0 }}>
        Home
      </Menu.Item>)
      : (<Menu.Item onClick={() => { navigate('/women'); }} key="cat2" >
         Donna
      </Menu.Item>)
    ],
    [2, location.pathname === "/children" ?
      (<Menu.Item onClick={() => { navigate('/'); }} key="home" style={{ color: "#13603C", left: "auto", right: 0 }}>
        Home
      </Menu.Item>) : (<Menu.Item onClick={() => { navigate('/children'); }} key="cat3" >
        Bambino
      </Menu.Item>)],
    [3, location.pathname === "/LXR_G" ? (<Menu.Item onClick={() => { navigate('/'); }} key="home" style={{ color: "#13603C", left: "auto", right: 0 }}>
      Home
      </Menu.Item>) :
      (<Menu.Item onClick={() => { navigate('/LXR_G'); }} key="cat4" >
        Lacoste X Roland Garros
      </Menu.Item>)]
  ])

  return (
    <Header className="header">
      <img src={Cock} alt="logo" width="6%" />
      <img src={require("./scrittaLacoste.png")} alt="logo" width="6%" />
      <Menu
        className="menuStyle"
        style={{ width: "100%", margin: 0, padding: 20, height: 0, display: "flex", justifyContent: "flex-end", alignItems: "center", }}
        disabledOverflow={true} mode="horizontal" breakpoint="lg" collapsedWidth="0" defaultSelectedKeys={"home"} >

        <Menu.Item  key="account" >
            {location.pathname === "/account" ?
              <Button size="large" type="text" shape="circle" onClick={() => { navigate('/'); }} icon={<HomeOutlined style={{ fontSize: "23px", color: "#13603C" }} />} />
              :
              <Button size="large" type="text" shape="circle" onClick={() => { navigate('/account'); }} icon={<UserAddOutlined style={{ fontSize: "23px", color: "black" }} />} />
            }
        </Menu.Item>

        <Menu.SubMenu popupClassName="submenu align-right" popupOffset={[-145,-2]} style={{ left: 7 }} key="categories" icon={<TagOutlined style={{ fontSize: "23px", color: "black " }} />}>
          {[...submenu_items.values()]}
        </Menu.SubMenu>

        <Menu.Item key="shop" >
          {location.pathname === "/store" ?
            <Button size="large" type="text" shape="circle" onClick={() => { navigate('/'); }} icon={<HomeOutlined style={{ fontSize: "23px", color: "#13603C" }} />} />
            :
            <Button size="large" type="text" shape="circle" onClick={() => { navigate('/store'); }} icon={<ShoppingCartOutlined  style={{ fontSize: "28px", color: "black " }} />} />
          }
        </Menu.Item>
        <Menu.Item key="search">

          <TweenOneGroup
            appear={false}
            enter={{ width: 275, duration: 2000, borderRadius: "50px" }} leave={{ opacity: 0, width: 0, duration: 2000, marginLeft: 16, marginRight: -33 }}
          >
            {isOnSearch ?
              <Input key="1" placeholder="Cerca" allowClear onSearch={onSearch} className="test"
                style={{ top: -3, borderColor: "#13603C", border: "", marginLeft: -16, width: 0, paddingLeft: 3 }}
              /> : null}
            <Button style={{ top: 1 }} size="large" type="text" shape="circle" icon={<SearchOutlined style={{ fontSize: "23px" }} />} onClick={() => { setIsOnSearch(!isOnSearch) }} />
          </TweenOneGroup>
        </Menu.Item>
      </Menu>
    </Header>
  );
} export default HeaderComp;