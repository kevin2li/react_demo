import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import TabComponent from './Tab.js';
import { BrowserRouter as Router, Link, } from "react-router-dom";
import axios from 'axios'
import Index from '../views/Index'
import Blog from '../views/Blog'
const { Header, Content, Footer } = Layout;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      image_data: null,
      current_tab: '1'
    }
    this.handleClick = this.handleClick.bind(this)
    this.switch_nav = this.switch_nav.bind(this)
    this.clickLogo = this.clickLogo.bind(this)
  }

  async handleClick() {
    const response = await axios.get('/time');
    // this.setState({ time: response.data.time})
    this.setState({ time: response.data.time })
  }
  async clickLogo() {
    // const response = await axios.get('/index');
    // this.setState({ tab_type: response.data.tab_type })
    this.setState({ current_tab: "1" })

  }
  async switch_nav({ item, key, keyPath, domEvent }) {
    this.setState({ current_tab: key })
  }

  render() {
    const props = {
      switch_nav: this.switch_nav,
      clickLogo: this.clickLogo,
      current_tab: this.state.current_tab
    }
    if (this.state.current_tab === '1') {
      return (
        <Index {...props}></Index>
      )
    } else if (this.state.current_tab === '5') {
      return (
        <Blog {...props}></Blog>
      )
    } else {
      return (
        <Layout style={{ height: '100%' }}>
          <Header className="header">
            <Router>
              {/* TODO: 菜单项回到首页 */}
              <div className="logo"><Link to="/index" onClick={this.clickLogo}>集成隐写分析平台</Link></div>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.state.current_tab]} onSelect={this.switch_nav}>
                <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/steganography">隐写术</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/steganalysis">隐写分析</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/download">下载专区</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/blog">Blog</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/about">关于我们</Link></Menu.Item>
              </Menu>
            </Router>
          </Header>
          <Layout>
            <Layout style={{ padding: '0 24px' }}>
              {/* <Breadcrumb style={{ margin: '16px 0 0 20px' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}

              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: "20px 0px",
                }}
              >
                <TabComponent current_tab={this.state.current_tab}></TabComponent>
                {/* <Button type="primary" onClick={this.handleClick}>Click me</Button>
                <h1>{this.state.time}</h1>
                <Image src={"data:image/png;base64, " + this.state.image_data} /> */}
              </Content>
            </Layout>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      )
    }
  }
}

export default App;