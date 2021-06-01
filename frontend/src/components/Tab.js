import React from 'react';
import { Tabs, Typography, Button } from 'antd';
import Steganalysis from './Steganalysis'
import FormComponent from './Form'
const { Title, Paragraph } = Typography;

const { TabPane } = Tabs;
class TabComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.current_tab === '1'){
            return (
                <Tabs tabPosition="top" onChange={this.handleTabClick}>
                    <TabPane tab="简介" key="1">
                    <Typography>
                        <Title>平台介绍</Title>
                        <Paragraph>
                        微信对话开放平台是以提供串联微信生态内外的服务流程为核心，提供全网多样的流程化服务能力。为开发者和非开发者提供完备，高效，简易的可配置服务。欢迎加入开发者社区 一起讨论
                        </Paragraph>
                        <Paragraph>
                        平台对话系统由微信对话提供技术支持，应用业内最领先的语义理解模型。创建流程简单、易用，开发者无需深入学习自然语言处理技术，只需提供对话语料，即可零基础搭建智能客服平台与行业普通（问答型）或高级（任务型）智能对话技能。
                        </Paragraph>
                    </Typography>
                    </TabPane>
                    <TabPane tab="隐写术" key="2" >
                    </TabPane>
                    <TabPane tab="隐写分析" key="3">
                    </TabPane>
                </Tabs>
            )
        }else if(this.props.current_tab === '2'){
            return (
                <Tabs tabPosition="top" onChange={this.handleTabClick}>
                    <TabPane tab="简介" key="3">
                        <Typography>
                            <Title>背景介绍</Title>
                            <Paragraph>
                                隐写术是关于信息隐藏，即不让计划的接收者之外的任何人知道信息的传递事件（而不只是信息的内容）的一门技巧与科学,英文写作Steganography。而密码编码是关于信息加密，即设想到信息可能会被接受者之外的第三方获取而采取的一种措施，通过通信双方预先设定的规则对信息进行加密，使第三方即使获取到信息也无法理解其含义。所以隐写术重点在于信息的隐藏，密码编码重点在于信息的加密，这两者属于完全不同的概念。
                            </Paragraph>
                            <Title>图片隐写术的分类</Title>
                            <Paragraph>
                                一、附加式的图片隐写<br/>
                                二、基于文件结构的图片隐写<br/>
                                三、基于LSB原理的图片隐写<br/>
                                四、基于DCT域的JPG图片隐写<br/>
                                五、数字水印的隐写<br/>
                                六、图片容差的隐写<br/>
                            </Paragraph>
                        </Typography>
                    </TabPane>
                    <TabPane tab="文本隐写" key="1" >
                        <Typography>
                            <Title  style={{ textAlign: 'center' }}>文本隐写Demo</Title>
                        </Typography>
                    </TabPane>
                    <TabPane tab="图像隐写" key="2">
                        <Typography>
                                <Title style={{ textAlign: 'center' }}>图像隐写Demo</Title>
                        </Typography>
                    </TabPane>
                </Tabs>
            )
        }else if(this.props.current_tab === '3'){
            return (
                <Steganalysis></Steganalysis>
            )
        }else if(this.props.current_tab === '4'){
            return (
                <Tabs tabPosition="top" onChange={this.handleTabClick}>
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
                        图像中的各种信息都得以有效的保存.<br/>
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
                    <Button type="link" href='http://www.baidu.com'>[1]付章杰,李恩露,程旭,黄永峰,胡雨婷.基于深度学习的图像隐写研究进展[J].计算机研究与发展,2021,58(03):548-568.</Button><br/>
                    <Button type="link" href='http://www.baidu.com'>[2]陈君夫,付章杰,张卫明,程旭,孙星明.基于深度学习的图像隐写分析综述[J].软件学报,2021,32(02):551-578.</Button><br />
                    <Button type="link" href='http://www.baidu.com'>[3]付章杰,王帆,孙星明,王彦.基于深度学习的图像隐写方法研究[J].计算机学报,2020,43(09):1656-1672.</Button>
                    </TabPane>
                </Tabs>
            )
        }else if(this.props.current_tab === '6'){
            return (
                <Tabs tabPosition="top" onChange={this.handleTabClick}>
                    <TabPane tab="团队介绍" key="1" >
                    <Paragraph>
                    LAMDA隶属于 计算机软件新技术国家重点实验室 和 南京大学计算机科学与技术系. LAMDA 位于南京大学仙林校区计算机科学技术楼, 总部在910室，负责人是 周志华 教授.
                    </Paragraph>
                    <Paragraph>
                    " LAMDA" 的含义是 "Learning And Mining from DatA". LAMDA 的主要研究兴趣包括机器学习、数据挖掘、模式识别、信息检索、演化计算、神经计算，以及相关的其他领域. 目前的主要研究内容包括：集成学习、半监督与主动学习、多示例与多标记学习、代价敏感和类别不平衡学习、度量学习、降维与特征选择、结构学习与聚类、演化计算的理论基础、增强可理解性、基于内容的图像检索、 Web 搜索与挖掘、人脸识别、 计算机辅助医疗诊断、生物信息学等. LAMDA 的 成员包括教师、工作人员、学生、访问学者和进修教师. 若您希望申请国内访问学者或进修教师，请与南京大学人事处联系；如果您希望申请博士后，请与周志华教授联系; 如果您希望在 LAMDA 攻读博士或硕士学位，请在前一年的五月左右阅读 这个网页 并根据要求提供必要的申请材料，请注意，所有申请者都要经过提前面试（面试程序相同，最终结果取决于您与导师的双向选择）； 如果您希望在 LAMDA 做本科毕业论文 ( 限南京大学本校生 ) ，请通过 Email 与具体的 LAMDA 全职 教师成员 联系.
                    </Paragraph>
                    </TabPane>
                    <TabPane tab="发表论文" key="2">
                    <Button type="link" href='http://www.baidu.com'>[1]付章杰,李恩露,程旭,黄永峰,胡雨婷.基于深度学习的图像隐写研究进展[J].计算机研究与发展,2021,58(03):548-568.</Button><br/>
                    <Button type="link" href='http://www.baidu.com'>[2]陈君夫,付章杰,张卫明,程旭,孙星明.基于深度学习的图像隐写分析综述[J].软件学报,2021,32(02):551-578.</Button><br />
                    <Button type="link" href='http://www.baidu.com'>[3]付章杰,王帆,孙星明,王彦.基于深度学习的图像隐写方法研究[J].计算机学报,2020,43(09):1656-1672.</Button>
                    </TabPane>
                    <TabPane tab="新闻" key="3">
                        <Paragraph>
                            2021-05-01	LAMDA招收2022年秋季入学研究生说明
                        </Paragraph>
                        <Paragraph>
                            2021-01-31	冯霁博士荣获2020年CCF优秀博士学位论文奖
                        </Paragraph>
                        <Paragraph>
                            2021-01-08	赵申宜顺利通过博士答辩
                        </Paragraph>
                        <Paragraph>
                            2020-12-15	国防科技大学侯臣平教授访问LAMDA并作报告
                        </Paragraph>
                        <Paragraph>
                            2020-11-25	钱鸿顺利通过博士答辩
                        </Paragraph>
                        <Paragraph>
                            2020-11-20	丁尧相顺利通过博士答辩
                        </Paragraph>
                        <Paragraph>
                            2020-11-20	庞明顺利通过博士答辩
                        </Paragraph>
                    </TabPane>
                </Tabs>
            )
        }
    }
}

export default TabComponent