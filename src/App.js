
import './App.css';
import {Layout, Menu,Image} from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Header, Content,} = Layout;

let logo = require("./img/Lacoste-Logo.png")
let immagine1 = require("./img/djokovic.jpg")
let immagine2 = require("./img/polo.jpg")


const items = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

function App() {
  return (
    <Layout className="layout">
      <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>

      <div class="logo">
      <img src={logo} alt="test" width="8.5%"></img>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
        />
      <Content style={{ padding: '0 50px' }}>
      </Content>
        
        <i class="fas fa-comment-alt"></i>

  <div class="container">
      <div class="container1">
        <img class="immagine" src={immagine1}  alt="test2"></img>
        <div class="overlay1">
          <div class="text">
            TENNIS & ROLAND GARROS
          </div>
        </div>       
      </div>

      <div class="container2">
        <img class="immagine" src={immagine2}  alt="test2"></img>
          <div class="overlay2">
            <div class="text">
              POLO AND LUXURY
            </div>
          </div>  
      </div>
    </div>

    <footer>
      
    </footer>
    </Layout>
  );
}

export default App;
