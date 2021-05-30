import React from 'react';
import { Layout, Menu, Breadcrumb, Button, Image } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;
import TabComponent from './Tab.js';
// import Home from '../views/Home.js';
// import Contact from '../views/Contact.js';
// import About from '../views/About.js';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      tab_type: 'index',
      image_data: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.switch_nav = this.switch_nav.bind(this)
  }
  // // Similar to componentDidMount and componentDidUpdate:
  // async componentDidMount() {
  //   // const response = await axios.get('https://api.npms.io/v2/search?q=react');
  //   const response = await axios.get('/time');
  //   this.setState({ time: response.data.time })
  // }
  async handleClick(){
    const response = await axios.get('/image');
    // this.setState({ time: response.data.time})
    this.setState({image_data: response.data.image_data})
  }
  
  async switch_nav({ item, key, keyPath, domEvent }){
    if(key === '1'){
      this.setState({tab_type: 'index'})
      const response = await axios.get('/');
      alert(response.data)
    }else if(key === '2'){
      this.setState({tab_type: 'steganography'})
      const response = await axios.get('/steganography');
      alert(response.data)
    }else if(key === '3'){
      this.setState({tab_type: 'steganalysis'})
      const response = await axios.get('/steganalysis');
      alert(response.data)
    }else if(key === '4'){
      this.setState({tab_type: 'download'})
      const response = await axios.get('/download');
      alert(response.data)
    }else if(key === '5'){
      this.setState({tab_type: 'about'})
      const response = await axios.get('/about');
      alert(response.data)
    }
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Router>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} onSelect={this.switch_nav}>
              <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/steganography">隐写术</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/steganalysis">隐写分析</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/download">下载专区</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/about">关于我们</Link></Menu.Item>
              <Switch>
                <Route path="/" exact />
                <Route path="/steganography"  />
                <Route path="/steganalysis" />
                <Route path="/download"  />
                <Route path="/about"  />
              </Switch>
            </Menu>
          </Router>
        </Header>
        <Layout>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 600,
              }}
            >
              <TabComponent tab_type={this.state.tab_type}></TabComponent>
              <Button type="primary" onClick={this.handleClick}>Click me</Button>
              <h1>{this.state.time}</h1>
              <Image src={"data:image/png;base64, " + this.state.image_data} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default App;