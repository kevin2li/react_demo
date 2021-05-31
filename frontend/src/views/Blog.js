import React from 'react';
import { BrowserRouter as Router, Link, } from "react-router-dom";
import { Layout, Menu, Space, Tag, PageHeader, Typography} from 'antd';
const { Header, Content, Footer } = Layout;
const { Text, Paragraph } = Typography;

class Blog extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Layout style={{ height: '100%'}}>
            <Header className="header">
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
              <Layout style={{ padding: '0 24px 24px' }}>
  
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: "20px 0px",
                    minHeight: 800,
                  }}
                >
                  <Space direction="vertical" size="large">
                  <PageHeader
                    title="JPEG隐写研究入门"
                    className="site-page-header"
                    subTitle=""
                    tags={[<Tag color="blue">隐写</Tag>]}
                    extra={[]}
                  >
                    <Content
                      extraContent={
                        <img
                          src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                          alt="content"
                          width="100%"
                        />
                      }
                    >
                      <Paragraph>
                        信息隐藏是将秘密信息嵌入到自然载体中而不改变其感知特性，通过载密载体在公开信道上的传递来完成秘密信息的传输。近年来由于深度学习设备算力的大幅提升，深度学习在计算机视觉、自然语言处理...
                      </Paragraph>
  
                      <div>
                        <span>2021年5月31日 | </span>
                        <span>阅读全文{'>'} </span>
                      </div>
                    </Content>
                  </PageHeader>
                  <PageHeader
                    title="隐写与隐写分析：ISGAN隐写与Zhu-Net检测"
                    className="site-page-header"
                    subTitle=""
                    tags={[<Tag color="blue">隐写</Tag>, <Tag color="blue">隐写分析</Tag>]}
                    extra={[]}
                  >
                    <Content
                      extraContent={
                        <img
                          src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                          alt="content"
                          width="100%"
                        />
                      }
                    >
                      <Paragraph>
                        信息隐藏是将秘密信息嵌入到自然载体中而不改变其感知特性，通过载密载体在公开信道上的传递来完成秘密信息的传输。近年来由于深度学习设备算力的大幅提升，深度学习在计算机视觉、自然语言处理...
                      </Paragraph>
  
                      <div>
                        <span>2021年5月31日 | </span>
                        <span>阅读全文{'>'} </span>
                      </div>
                    </Content>
                  </PageHeader>
                  <PageHeader
                    title="空域图像隐写研究简述"
                    className="site-page-header"
                    subTitle=""
                    tags={[<Tag color="blue">隐写</Tag>]}
                    extra={[]}
                  >
                    <Content
                      extraContent={
                        <img
                          src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                          alt="content"
                          width="100%"
                        />
                      }
                    >
                      <Paragraph>
                        信息隐藏是将秘密信息嵌入到自然载体中而不改变其感知特性，通过载密载体在公开信道上的传递来完成秘密信息的传输。近年来由于深度学习设备算力的大幅提升，深度学习在计算机视觉、自然语言处理...
                      </Paragraph>
  
                      <div>
                        <span>2021年5月31日 | </span>
                        <span>阅读全文{'>'} </span>
                      </div>
                    </Content>
                  </PageHeader>
                  </Space>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
              </Layout>
            </Layout>
          </Layout>            
        )
    }
}

export default Blog;