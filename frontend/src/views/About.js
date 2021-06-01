import React from 'react';
import { Layout, Tabs, Typography, Button } from 'antd';
const { TabPane } = Tabs;
const { Content } = Layout;
const { Title, Paragraph, Text} = Typography;

class About extends React.Component {

    render() {
        return (
            <Layout style={{ padding: '0 24px' }}>
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
                </Content>
            </Layout>
        )
    }
}

export default About