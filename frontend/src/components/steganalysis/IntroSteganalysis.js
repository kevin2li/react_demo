import React from 'react';
import { Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

class IntroSteganalysis extends React.Component {

    render() {
        return (
            <>
                <Typography>
                    <Title>隐写分析</Title>
                    <Paragraph>
                        <Text strong>隐写分析</Text>（steganalysis）是指在已知或未知嵌入算法的情况下，从观察到的数据检测判断其中是否存在秘密信息，分析数据量的大小和数据嵌入的位置，并最终破解嵌入内容的过程。
                    </Paragraph>
                    <Paragraph>
                        隐写分析是对隐写术的攻击，目的是为了检测秘密消息的存在以至破坏隐秘通信，隐写分析是解决非法使用隐写术问题的关键技术。近几年来由于恐怖活动猖獗，而受到了较多的关注，获得了较大的发展，但还没有形成成熟的、系统化的理论体系。隐写分析技术的提高有利于防止隐写术的非法应用，可以起到防止机密资料流失、揭示非法信息、打击恐怖主义、预防灾难发生的作用，从而保证国家的安全和社会的稳定。
                    </Paragraph>
                    <Paragraph>
                        根据使用嵌入载体的不同，可分为<Text strong>图像隐写分析</Text>、<Text strong>文本隐写分析</Text>、音频隐写分析等，其中图像隐写分析使用最广。
                    </Paragraph>
                </Typography>
            </>
        )
    }
}

export default IntroSteganalysis
