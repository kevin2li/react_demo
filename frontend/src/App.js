import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import Index from './views/Index'
import Blog from './views/Blog'
import Download from './views/Download'
import Steganography from './views/Steganography'
import Steganalysis from './views/Steganalysis'
import About from './views/About'
const { Header, Footer } = Layout;
const {Link} = Typography
const map = {
  '1': '/index',
  '2': 'steganography',
  '3': '/steganalysis',
  '4': '/download',
  '5': '/blog',
  '6': '/about',
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      image_data: null,
      current_tab: '1'
    }
    this.menuRef = React.createRef();
  }

  clickLogo = () => {
    this.setState({ current_tab: '1' })
  }

  switch_nav =  e => {
    // console.log(e)
    this.setState({ current_tab: e.key })
    // const response = await axios({
    //   method: "get",
    //   url: map[key],
    // })
    // console.log(response.data)
    // this.setState({current_tab: response.data.current_tab})
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
            <div className="logo"><Link to="/index" onClick={this.clickLogo}>集成隐写分析平台</Link></div>
            <Menu theme="dark" ref={this.menuRef} mode="horizontal" selectedKeys={[this.state.current_tab]} onSelect={this.switch_nav}>
              <Menu.Item key="1" onClick={this.switch_nav}><Link >首页</Link></Menu.Item>
              <Menu.Item key="2" onClick={this.switch_nav}><Link >隐写术</Link></Menu.Item>
              <Menu.Item key="3" onClick={this.switch_nav}><Link >隐写分析</Link></Menu.Item>
              <Menu.Item key="4" onClick={this.switch_nav}><Link >下载专区</Link></Menu.Item>
              <Menu.Item key="5" onClick={this.switch_nav}><Link >Blog</Link></Menu.Item>
              <Menu.Item key="6" onClick={this.switch_nav}><Link >关于我们</Link></Menu.Item>
            </Menu>
        </Header>
          {content}
        <Footer style={{ textAlign: 'center' }}>Integrated Steganalysis Platform ©2021 Created by Kevin Li</Footer>
      </Layout>
    )
  }
}

export default App;