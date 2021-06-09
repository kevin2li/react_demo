import React from 'react';
import { Layout, Tabs, Menu } from 'antd';
import {SettingOutlined } from '@ant-design/icons';
import IntroSteganography from '../components/steganography/IntroSteganography';
const { Content } = Layout;
const { SubMenu } = Menu;

class Steganography extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_menu: '1'
        }
    }
    handleClick = e => {
        // console.log('click ', e);
        this.setState({ current_menu: e.key });
    };
    render() {
        var content = null
        if(this.state.current_menu === '1'){
            content = <IntroSteganography></IntroSteganography>
        }else if(this.state.current_menu === 'LSB'){
            content = <>LSB正在开发中...</>
        }else if(this.state.current_menu === 'LSBM'){
            content = <>LSBM正在开发中...</>
        }else if(this.state.current_menu === 'WOW'){
            content = <>WOW正在开发中...</>
        }else if(this.state.current_menu === 'HidingImage'){
            content = <>以图藏图正在开发中...</>
        }
        var a = [1, 2, 3, 4, 5, 6]
        const url = window.URL.createObjectURL(
            new Blob([this.state.result]),
        );
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
                    <Menu mode="horizontal" selectedKeys={[this.state.current_menu]} onClick={this.handleClick}>
                        <Menu.Item key="1">
                            简介
                        </Menu.Item>
                        <SubMenu key="2" icon={<SettingOutlined />} title="图像隐写">

                            <SubMenu key="Traditional" icon={<SettingOutlined />} title="传统隐写">
                                <Menu.Item key="LSB">
                                        LSB
                                </Menu.Item>
                                <Menu.Item key="LSBM">
                                        LSBM
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="Adaptive" icon={<SettingOutlined />} title="自适应隐写">
                                <Menu.Item key="WOW">
                                    WOW
                                </Menu.Item>
                                <Menu.Item key="S-UNIWARD">
                                    S-UNIWARD
                                </Menu.Item>
                                <Menu.Item key="HILL">
                                    HILL
                                </Menu.Item>
                                <Menu.Item key="HUGO">
                                    HUGO
                                </Menu.Item>
                                <Menu.Item key="MG">
                                    MG
                                </Menu.Item>
                                <Menu.Item key="MVG">
                                    MVG
                                </Menu.Item>
                                <Menu.Item key="MiPOD">
                                    MiPOD
                                </Menu.Item>
                                <Menu.Item key="UT-GAN">
                                    UT-GAN
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="HidingImage">
                                以图藏图
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="3" icon={<SettingOutlined />} title="文本隐写">
                                <Menu.Item key="RNN-Stega">
                                        RNN-Stega
                                </Menu.Item>
                                <Menu.Item key="GPT-Stega">
                                        GPT-Stega
                                </Menu.Item>
                                <Menu.Item key="VAE-Stega">
                                        VAE-Stega
                                </Menu.Item>
                                <Menu.Item key="MM-Stega">
                                        MM-Stega
                                </Menu.Item>
                        </SubMenu>
                    </Menu>
                    {content}
                </Content>
            </Layout>
        )
    }
}

export default Steganography