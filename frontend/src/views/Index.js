import React from 'react';
import { BrowserRouter as Router, Link, } from "react-router-dom";
import { Layout, Menu} from 'antd';

const { Header, Content, Footer } = Layout;
const img_urls = ['url(http://img.daimg.com/uploads/allimg/190610/3-1Z610162304.jpg)', 'url(https://photoos.macsc.com/2021/02/02/03/02031706_9d2da8395b_small.jpg)', 'url(https://lh3.googleusercontent.com/proxy/yPO4DaonLKqcarbJG3ByuGdtaIqQrCI-z858HTKpYEVU_BVD6MVI_wBmNN24mo_iDwPLY6qbedBZVBGsmMKMS-_4eM1kq11zFxn4uRnX)']
const baseStyle1 = {
  minHeight: '600px',
  width: '100%',
  lineHeight: '400px',
  textAlign: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  backgroundImage: img_urls[0]
}
class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Layout style={{ height: '100%'}}>
            <Header className="header" >
              <Router>
                {/* TODO: 菜单项回到首页 */}
                <div className="logo"><Link to="/index" onClick={this.props.clickLogo}>集成隐写分析平台</Link></div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.props.current_tab]} onSelect={this.props.switch_nav}>
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
              <Layout style={{ padding: '0',  }}>
  
                <Content
                  style={{
                    // minHeight: 700,
                  }}
                >
                    <div style={baseStyle1}>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
              </Layout>
            </Layout>
          </Layout>   
        )
    }
}

export default Index