import React from 'react';
import { Tabs, Layout, Typography, Button } from 'antd';
const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

class Download extends React.Component {

    render() {
        return (
            <Layout style={{ padding: '0 24px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: "20px 0px",
                        height: '100%',
                        width: '100%'
                    }}
                >
                    {/* <TabComponent current_tab={this.state.current_tab}></TabComponent> */}
                    <Tabs tabPosition="top" onChange={this.props.handleTabClick}>
                        <TabPane tab="数据集" key="1" >
                            <Title>BOSSBaseV1.01</Title>
                            <Paragraph>
                                BOSSbase1.01 是 Fridrich 团队 2011 年所创建的用于隐写分析竞赛的专用数据集,采用 7 种不同类型的数码相机拍摄得到的图像用于隐写和隐写分析,可以
                        防止单个数码相机拍摄出现相机指纹,使判别器学习出现偏差。<br />
                        下载地址：<Button type="link" href='http://www.baidu.com'>BOSSBaseV1.01</Button>
                            </Paragraph>
                            <Title>BOSW2</Title>
                            <Paragraph>
                                BOWS2 数据集始创于 2008 年用于水印竞赛,由于其特征分布于内容与 BOSS 数据集相似,自 2017 年后,
                                被信息隐藏领域广泛的使用当作 BOSS 数据集的补充.UCID(Uncompressed Colour Image Database)5是一种
                                彩色图片数据集,数据内的图片已经标好了预设的正确选框,由于图片的处理过程中没有采取任何压缩方式,
                        图像中的各种信息都得以有效的保存.<br />
                        下载地址：<Button type="link" href='http://www.baidu.com'>BOSW2</Button>
                            </Paragraph>
                        </TabPane>
                        <TabPane tab="代码" key="2">
                            <Title>隐写算法</Title>
                            <Title level={4}>WOW</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>WOW</Button>
                            <Title level={4}>S-UNIWARD</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>S-UNIWARD</Button>
                            <Title level={4}>HILL</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>HILL</Button>
                            <Title level={4}>HUGO</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>HUGO</Button>
                            <Title level={4}>MG</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>MG</Button>
                            <Title level={4}>MVG</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>MVG</Button>
                            <Title level={4}>MiPOD</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>MiPOD</Button>
                            <Title level={4}>Ut-GAN</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>Ut-GAN</Button>
                            <Title>隐写分析算法</Title>
                            <Title level={4}>XuNet</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>XuNet</Button>
                            <Title level={4}>YeNet</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>YeNet</Button>
                            <Title level={4}>Yedroudj-Net</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>Yedroudj-Net</Button>
                            <Title level={4}>SRNet</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>SRNet</Button>
                            <Title level={4}>ZhuNet</Title>
                        下载地址：<Button type="link" href='http://www.baidu.com'>ZhuNet</Button>
                        </TabPane>
                        <TabPane tab="相关论文" key="3">
                            <Button type="link" href='http://www.baidu.com'>[1]付章杰,李恩露,程旭,黄永峰,胡雨婷.基于深度学习的图像隐写研究进展[J].计算机研究与发展,2021,58(03):548-568.</Button><br />
                            <Button type="link" href='http://www.baidu.com'>[2]陈君夫,付章杰,张卫明,程旭,孙星明.基于深度学习的图像隐写分析综述[J].软件学报,2021,32(02):551-578.</Button><br />
                            <Button type="link" href='http://www.baidu.com'>[3]付章杰,王帆,孙星明,王彦.基于深度学习的图像隐写方法研究[J].计算机学报,2020,43(09):1656-1672.</Button>
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        )
    }
}

export default Download
