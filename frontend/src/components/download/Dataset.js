import React from 'react';
import {Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

class Dataset extends React.Component {

    render() {
        return (
            <>
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
            </>
        )
    }
}

export default Dataset
