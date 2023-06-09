import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { Button, Tooltip, Input, Layout, Menu, ConfigProvider } from "antd";
import {
  TagOutlined,
  HomeOutlined,
  UserAddOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import TweenOne from "rc-tween-one";
import Cock from "./Cockodrillo.svg";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../authContext";
import { useEffect } from "react";

const { Header } = Layout;
var TweenOneGroup = TweenOne.TweenOneGroup;
const onSearch = (value) => console.log(value);
const HeaderComp = ({User}) => {
  let navigate = useNavigate();
  const location = useLocation();
  
  const [searchText, setSearchText] = useState("");
  const authContext = useContext(AuthContext);

  const cachedUser = localStorage.getItem('user');
  useEffect(() => {
    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      console.log(user.username);
      console.log(user.password);
      User=user
    }
  }, [])

  const handleLogout = () => {
    // Perform logout logic
    authContext.setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearch = () => {
    // Perform search logic
    console.log("Search for:", searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const [isOnSearch, setIsOnSearch] = useState(false);
  
  React.useEffect(() => {
    console.log(User)
  }, [User]);
  const [current, setCurrent] = useState('cat1');
  let submenu_items = new Map([
    [0, location.pathname === "/men" ?  
      (<Menu.Item onClick={() => { navigate('/'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} key="home" style={{ color: "#13603C", left: "auto", right: 0 }}>
        Home
      </Menu.Item>) : 
      (<Menu.Item onClick={() => { navigate('/men'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} key="cat1" style={{ left: "auto", right: 0 }}>
        Uomo
      </Menu.Item>)
    ],
    [1, location.pathname === "/women" ?
      (<Menu.Item onClick={() => { navigate('/'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} key="home" style={{ color: "#13603C", left: "auto", right: 0 }}>
        Home
      </Menu.Item>)
      : (<Menu.Item onClick={() => { navigate('/women'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} key="cat2" >
         Donna
      </Menu.Item>)
    ],
    [2, location.pathname === "/children" ?
      (<Menu.Item onClick={() => { navigate('/'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} key="home" style={{ color: "#13603C", left: "auto", right: 0 }}>
        Home
      </Menu.Item>) : (<Menu.Item onClick={() => { navigate('/children'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} key="cat3" >
        Bambino
      </Menu.Item>)],
    [3, location.pathname === "/LXR_G" ? (<Menu.Item onClick={() => { navigate('/'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} key="home" style={{ color: "#13603C", left: "auto", right: 0 }}>
      Home
      </Menu.Item>) :
      (<Menu.Item onClick={() => { navigate('/LXR_G'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} key="cat4" >
        Lacoste X Roland Garros
      </Menu.Item>)]
  ])

  return (
    <Header className="header">
      <img src={Cock} alt="logo" width="3%" onClick={() => { navigate('/'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} style={{cursor:"pointer"}}/>
      <img src={require("./scrittaLacoste.png")} alt="logo" width="6%" onClick={() => { navigate('/'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} style={{cursor:"pointer"}}/>
      <Menu 
        className="menuStyle"
        style={{ width: "100%", margin: 0, padding: 20, height: 0, display: "flex", justifyContent: "flex-end", alignItems: "center", }}
        disabledOverflow={true} mode="horizontal" breakpoint="lg" collapsedWidth="0" defaultSelectedKeys={"home"} >

        <Menu.Item  key="account" >
            {location.pathname === "/account" ?
              <Button size="large" type="text" shape="circle" onClick={() => { navigate('/'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} icon={<HomeOutlined style={{ fontSize: "23px", color: "#13603C" }} />} />
              :
              <Button size="large" type="text" shape="circle" onClick={() => { User.account_id===undefined?navigate('/account'):navigate('/profile'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} icon={<UserOutlined style={{ fontSize: "23px", color: "black" }} />} />
            }
        </Menu.Item>

        <Menu.SubMenu popupClassName="submenu align-right" popupOffset={[-145,-2]} style={{ left: 7 }} key="categories" icon={<TagOutlined style={{ fontSize: "23px", color: "black " }} />}>
          {[...submenu_items.values()]}
        </Menu.SubMenu>

        <Menu.Item key="shop" >
          {location.pathname === "/store" ?
            <Button size="large" type="text" shape="circle" onClick={() => { navigate('/'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} icon={<HomeOutlined style={{ fontSize: "23px", color: "#13603C" }} />} />
            :
            <Button size="large" type="text" shape="circle" onClick={() => { navigate('/store'); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} icon={<ShoppingCartOutlined  style={{ fontSize: "28px", color: "black " }} />} />
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
} 
export default HeaderComp;