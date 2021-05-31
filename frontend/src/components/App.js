import React from 'react';
import { Layout, Menu, Card, Col, Button, Row, Space, PageHeader, Typography, Tag } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;
import TabComponent from './Tab.js';
// import Home from '../views/Home.js';
// import Contact from '../views/Contact.js';
// import About from '../views/About.js';
import { BrowserRouter as Router, Link, } from "react-router-dom";
import axios from 'axios'
const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const { Text, Paragraph } = Typography;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      tab_type: 'index',
      image_data: null,
      current_tab: 1
    }
    this.handleClick = this.handleClick.bind(this)
    this.switch_nav = this.switch_nav.bind(this)
    this.clickLogo = this.clickLogo.bind(this)
  }
  // // Similar to componentDidMount and componentDidUpdate:
  // async componentDidMount() {
  //   // const response = await axios.get('https://api.npms.io/v2/search?q=react');
  //   const response = await axios.get('/time');
  //   this.setState({ time: response.data.time })
  // }
  async handleClick() {
    const response = await axios.get('/time');
    // this.setState({ time: response.data.time})
    this.setState({ time: response.data.time })
  }
  async clickLogo() {
    const response = await axios.get('/index');
    this.setState({ tab_type: response.data.tab_type })
  }
  async switch_nav({ item, key, keyPath, domEvent }) {
    this.setState({ current_tab: key })
    if (key === '1') {
      const response = await axios.get('/index');
      this.setState({ tab_type: response.data.tab_type })

    } else if (key === '2') {
      const response = await axios.get('/steganography');
      this.setState({ tab_type: response.data.tab_type })

    } else if (key === '3') {
      const response = await axios.get('/steganalysis');
      this.setState({ tab_type: response.data.tab_type })

    } else if (key === '4') {
      const response = await axios.get('/download');
      this.setState({ tab_type: response.data.tab_type })
    } else if (key === '5') {

    } else if (key === '6') {
      const response = await axios.get('/about');
      this.setState({ tab_type: response.data.tab_type })
    }
  }

  render() {
    if (this.state.current_tab === '5') {
      const a_style = { 'text-decoration': 'none' }
      return (
        <Layout>
          <Header className="header">
            <Router>
              {/* TODO: 菜单项回到首页 */}
              <div className="logo"><Link to="/index" onClick={this.clickLogo}>集成隐写分析平台</Link></div>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} onSelect={this.switch_nav}>
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
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: "20px 0px",
                  minHeight: 750,
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
                      <span>阅读全文> </span>
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
                      <span>阅读全文> </span>
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
                      <span>阅读全文> </span>
                    </div>
                  </Content>
                </PageHeader>
                </Space>
                {/* <Row gutter={16}>
                  <Col span={6}>
                    <a href="https://mp.weixin.qq.com/s/er_jiPZGOEfokSLcIZ92TA" target="_blank" style={a_style}>
                    <Card
                      hoverable
                      style={{ width: 320, height: 460 }}
                      cover={<img alt="example" src="https://mmbiz.qpic.cn/mmbiz_jpg/Rl62HbEjDKvHO5rDVFP0dFkyvhz2pbv7UPMoa1bRhHj5ibH6kLZpK12mRbxkvT6iaaoldib4Zld26EoyJ6YuBIBow/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" />}
                      actions={[
                        <Text>2021年5月31日</Text>,
                        <Text>7 MIN READ</Text>,
                        <Button type="link" onClick={() => { alert('ok') }}>Learn more</Button>
                      ]}
                    >
                      <Meta title="空域图像隐写研究简述" description=" 隐写通过在正常载体数据中嵌入秘密信息来实现隐蔽通信。随着近年来社交网络的兴起，数字图像成为了最好的社交媒介之一并广泛传播，因而成为了较为常用的隐写载体..." />
                    </Card>
                    </a>
                  </Col>
                  <Col span={6}>
                    <a href="https://mp.weixin.qq.com/s/uophaTDhWtSNO4Uic3_KQA" target="_blank" style={a_style}>
                    <Card
                      hoverable
                      style={{ width: 320, height: 460}}
                      cover={<img alt="example" src="https://mmbiz.qpic.cn/mmbiz_jpg/Rl62HbEjDKt2c3K9xt8gTHgplvOCglgmZ24BonEHYFloBFiaiczryUVIibA4PXBMmhK8SpOKKcskXUBOw5sI48Ekg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" />}
                      actions={[
                        <Text>2021年5月31日</Text>,
                        <Text>7 MIN READ</Text>,
                        <Button type="link" onClick={() => { alert('ok') }}>Learn more</Button>
                      ]}
                    >
                      <Meta title="隐写与隐写分析：ISGAN隐写与Zhu-Net检测" description=" 信息隐藏是将秘密信息嵌入到自然载体中而不改变其感知特性，通过载密载体在公开信道上的传递来完成秘密信息的传输。近年来由于深度学习设备算力的..." />
                    </Card>
                    </a>
                  </Col>
                    <a href="https://mp.weixin.qq.com/s/JnjyR9MnUMEW2HnEsPR34A" target="_blank" style={a_style}>
                    <Card
                      hoverable
                      style={{ width: 320, height: 460 }}
                      cover={<img alt="example" src="https://mmbiz.qpic.cn/mmbiz_jpg/Rl62HbEjDKs8ibfwCn6xdu2c4L0pNCUMYnoMSiasE3j6DXibicicF8FmYPO4WnDibHnZkJXDmWdm4umWg5GzX0oGnwcw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" />}
                      actions={[
                        <Text>2021年5月31日</Text>,
                        <Text>7 MIN READ</Text>,
                        <Button type="link" onClick={() => { alert('ok') }}>Learn more</Button>
                      ]}
                    >
                      <Meta title="JPEG隐写研究入门" description="JPEG图像是最为流行的数字图像格式之一，应用领域极为广泛，是最为理想的隐写载体之一。本文主要回顾JPEG图像发展过程中具有重要意义的论文和近期论文，为初学者建立阅读论文的指南。学习JPEG隐写方法需要一些基本知识，例如JPEG压缩过程..." />
                    </Card>
                    </a>
                  <Col span={6}>
                  </Col>
                </Row> */}
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </Layout>

      )
    } else {
      return (
        <Layout>
          <Header className="header">
            <Router>
              {/* TODO: 菜单项回到首页 */}
              <div className="logo"><Link to="/index" onClick={this.clickLogo}>集成隐写分析平台</Link></div>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} onSelect={this.switch_nav}>
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
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: "20px 0px",
                  minHeight: 750,
                }}
              >
                <TabComponent tab_type={this.state.tab_type}></TabComponent>
                {/* <Button type="primary" onClick={this.handleClick}>Click me</Button>
                <h1>{this.state.time}</h1>
                <Image src={"data:image/png;base64, " + this.state.image_data} /> */}
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </Layout>
      )
    }
  }
}

export default App;