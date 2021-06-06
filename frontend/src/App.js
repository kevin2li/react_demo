import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Link, } from "react-router-dom";
import Index from './views/Index'
import Blog from './views/Blog'
import Download from './views/Download'
import Steganography from './views/Steganography'
import Steganalysis from './views/Steganalysis'
import About from './views/About'
const { Header, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      image_data: null,
      current_tab: '1'
    }
    this.menuRef = React.createRef();
    // this.switch_nav = this.switch_nav.bind(this)
    // this.clickLogo = this.clickLogo.bind(this)
  }

  clickLogo = () => {
    this.setState({ current_tab: '1' })
  }

  switch_nav = ({ item, key, keyPath, domEvent }) => {
    this.setState({ current_tab: key })
  }

  render() {
    var content;
    if (this.state.current_tab === '1') {
      content = <Index></Index>
    } else if (this.state.current_tab === '2') {
      content = <Steganography></Steganography>
    } else if (this.state.current_tab === '3') {
      content = <Steganalysis></Steganalysis>
    } else if (this.state.current_tab === '4') {
      content = <Download></Download>
    } else if (this.state.current_tab === '5') {
      content = <Blog></Blog>
    } else if (this.state.current_tab === '6') {
      content = <About></About>
    }

    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Router>
            <div className="logo"><Link to="/index" onClick={this.clickLogo}>集成隐写分析平台</Link></div>
            <Menu theme="dark" ref={this.menuRef} mode="horizontal" defaultSelectedKeys={[this.state.current_tab]} onSelect={this.switch_nav}>
              <Menu.Item key="1"><Link to="/index">首页</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/steganography">隐写术</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/steganalysis">隐写分析</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/download">下载专区</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/blog">Blog</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/about">关于我们</Link></Menu.Item>
            </Menu>
          </Router>
        </Header>
          {content}
        <Footer style={{ textAlign: 'center' }}>Integrated Steganalysis Platform ©2021 Created by Kevin Li</Footer>
      </Layout>
    )
  }
}

export default App;