import React from 'react';
import { Tabs } from 'antd';
import Steganalysis from './Steganalysis'
import FormComponent from './Form'

const { TabPane } = Tabs;
class TabComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0
        }
        this.handleTabClick = this.handleTabClick.bind(this)
    }
    handleTabClick(event) {
        // alert("Great Shot!");
    }
    render() {
        if (this.props.tab_type === 'index'){
            return (
                <Tabs tabPosition="top" onChange={this.handleTabClick}>
                    <TabPane tab="隐写术" key="1" >
                        <FormComponent></FormComponent>
                    </TabPane>
                    <TabPane tab="隐写分析" key="2">
                    Content of Tab 2
                    </TabPane>
                    <TabPane tab="更多" key="3">
                    Content of Tab 3
                    </TabPane>
                </Tabs>
            )
        }else if(this.props.tab_type === 'steganography'){
            return (
                <Tabs tabPosition="top" onChange={this.handleTabClick}>
                    <TabPane tab="文本隐写" key="1" >
                    Content of Tab 1<br />
                    current time: {this.state.time}<br />
                    aaa: {this.tabKey}
                    </TabPane>
                    <TabPane tab="图像隐写" key="2">
                    Content of Tab 2
                    </TabPane>
                    <TabPane tab="更多" key="3">
                    Content of Tab 3
                    </TabPane>
                </Tabs>
            )
        }else if(this.props.tab_type === 'steganalysis'){
            return (
                <Steganalysis></Steganalysis>
            )
        }else if(this.props.tab_type === 'download'){
            return (
                <Tabs tabPosition="top" onChange={this.handleTabClick}>
                    <TabPane tab="数据集" key="1" >
                    Content of Tab 1<br />
                    current time: {this.state.time}<br />
                    aaa: {this.tabKey}
                    </TabPane>
                    <TabPane tab="代码" key="2">
                    Content of Tab 2
                    </TabPane>
                    <TabPane tab="相关论文" key="3">
                    Content of Tab 3
                    </TabPane>
                </Tabs>
            )
        }else if(this.props.tab_type === 'about'){
            return (
                <Tabs tabPosition="top" onChange={this.handleTabClick}>
                    <TabPane tab="团队介绍" key="1" >
                    Content of Tab 1<br />
                    current time: {this.state.time}<br />
                    aaa: {this.tabKey}
                    </TabPane>
                    <TabPane tab="发表论文" key="2">
                    Content of Tab 2
                    </TabPane>
                    <TabPane tab="更多" key="3">
                    Content of Tab 3
                    </TabPane>
                </Tabs>
            )
        }
    }
}

export default TabComponent