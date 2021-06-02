import React from 'react';
import { Tabs, Layout } from 'antd';
import Dataset from '../components/download/Dataset'
import Code from '../components/download/Code'
import Paper from '../components/download/Paper'

const { Content } = Layout;
const { TabPane } = Tabs;

class Download extends React.Component {

    render() {
        return (
            <Layout style={{ padding: '0 24px', minHeight: '83vh' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: "85px 0px 0 0",
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Tabs tabPosition="top" onChange={this.props.handleTabClick}>
                        <TabPane tab="数据集" key="1" >
                            <Dataset></Dataset>
                        </TabPane>
                        <TabPane tab="代码" key="2">
                            <Code></Code>
                        </TabPane>
                        <TabPane tab="相关论文" key="3">
                            <Paper></Paper>
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        )
    }
}

export default Download
