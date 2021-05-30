import React from 'react';
import { Tabs, Steps } from 'antd';
import UploadComponent from './Upload'
const { TabPane } = Tabs;
const { Step } = Steps;

class Steganalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'image', // ['image', 'text']
            current: 0,
        }
    }
    render() {
        return (
            <Tabs tabPosition="top" onChange={this.handleTabClick}>
                <TabPane tab="文本隐写分析" key="1" >
                    Content of Tab 1<br />
                                current time: {this.state.time}<br />
                </TabPane>
                <TabPane tab="图像隐写分析" key="2" >
                    <Steps current={this.state.current}>
                        <Step title="Finished" description="上传可疑图片" />
                        <Step title="In Progress" subTitle="" description="选择隐写分析模型" />
                        <Step title="Waiting" description="检测" />
                        <Step title="Waiting" description="查看结果" />
                    </Steps>
                    <UploadComponent></UploadComponent>
                </TabPane>
                <TabPane tab="更多" key="3">
                    Content of Tab 3
                </TabPane>
            </Tabs>
        )
    }
}

export default Steganalysis
