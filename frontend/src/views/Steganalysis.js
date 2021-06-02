import React from 'react';
import { Layout, Tabs } from 'antd';
import ImageSteganalysis from '../components/steganalysis/ImageSteganalysis'
import TextSteganalysis from '../components/steganalysis/TextSteganalysis'
import IntroSteganalysis from '../components/steganalysis/IntroSteganalysis'

const { TabPane } = Tabs;
const {Content } = Layout;

class Steganalysis extends React.Component {


    render() {
        return (
            <Layout style={{ padding: '0 24px', minHeight: '83vh' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: "20px 0px",
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Tabs tabPosition="top" onChange={this.handleTabClick}>
                        <TabPane tab="简介" key="1" >
                            <IntroSteganalysis></IntroSteganalysis>
                        </TabPane>
                        <TabPane tab="图像隐写分析" key="2" >
                            <ImageSteganalysis></ImageSteganalysis>
                        </TabPane>
                        <TabPane tab="文本隐写分析" key="3" >
                            <TextSteganalysis></TextSteganalysis>
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        )
    }
}

export default Steganalysis
