import React from 'react';
import {Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

class IntroSteganography extends React.Component {

    render() {
        return (
            <>
                <Typography>
                    <Title>背景介绍</Title>
                    <Paragraph>
                        隐写术是关于信息隐藏，即不让计划的接收者之外的任何人知道信息的传递事件（而不只是信息的内容）的一门技巧与科学,英文写作Steganography。而密码编码是关于信息加密，即设想到信息可能会被接受者之外的第三方获取而采取的一种措施，通过通信双方预先设定的规则对信息进行加密，使第三方即使获取到信息也无法理解其含义。所以隐写术重点在于信息的隐藏，密码编码重点在于信息的加密，这两者属于完全不同的概念。
                </Paragraph>
                    <Title>图片隐写术的分类</Title>
                    <Paragraph>
                        一、附加式的图片隐写<br />
                    二、基于文件结构的图片隐写<br />
                    三、基于LSB原理的图片隐写<br />
                    四、基于DCT域的JPG图片隐写<br />
                    五、数字水印的隐写<br />
                    六、图片容差的隐写<br />
                    </Paragraph>
                </Typography>
            </>
        )
    }
}

export default IntroSteganography
