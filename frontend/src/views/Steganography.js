import React from 'react';
import { Layout, Menu } from 'antd';
import IntroSteganography from '../components/steganography/IntroSteganography';
import ImageStega from '../components/steganography/ImageStega';
const { Content } = Layout;

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
        }else if(this.state.current_menu === '2'){
            content = <ImageStega></ImageStega>
        }else if(this.state.current_menu === '3'){
            content = <>文本隐写正在开发中...</>
            content = <>以图藏图正在开发中...</>
        }
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
                        <Menu.Item key="2">
                            图像隐写
                        </Menu.Item>
                        <Menu.Item key="3">
                            文本隐写
                        </Menu.Item>
                    </Menu>
                    {content}
                </Content>
            </Layout>
        )
    }
}

export default Steganography