import React from 'react';
import { Layout, Space, Tag, PageHeader, Typography } from 'antd';
const {  Content } = Layout;
const { Text, Paragraph } = Typography;

class Blog extends React.Component {

  render() {
    return (
      <Layout style={{ padding: '0 24px 24px', minHeight: '80vh' }}>

        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: "20px 0px",
            // minHeight: 800,
          }}
        >
          <Space direction="vertical" size="large">
            <PageHeader
              title="JPEG隐写研究入门"
              className="site-page-header"
              subTitle=""
              tags={[<Tag color="blue">隐写</Tag>]}
              extra={[]}
            >
              <Content
                extraContent={
                  <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                    alt="content"
                    width="100%"
                  />
                }
              >
                <Paragraph>
                  信息隐藏是将秘密信息嵌入到自然载体中而不改变其感知特性，通过载密载体在公开信道上的传递来完成秘密信息的传输。近年来由于深度学习设备算力的大幅提升，深度学习在计算机视觉、自然语言处理...
                      </Paragraph>

                <div>
                  <span>2021年5月31日 | </span>
                  <span>阅读全文{'>'} </span>
                </div>
              </Content>
            </PageHeader>
            <PageHeader
              title="隐写与隐写分析：ISGAN隐写与Zhu-Net检测"
              className="site-page-header"
              subTitle=""
              tags={[<Tag color="blue">隐写</Tag>, <Tag color="blue">隐写分析</Tag>]}
              extra={[]}
            >
              <Content
                extraContent={
                  <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                    alt="content"
                    width="100%"
                  />
                }
              >
                <Paragraph>
                  信息隐藏是将秘密信息嵌入到自然载体中而不改变其感知特性，通过载密载体在公开信道上的传递来完成秘密信息的传输。近年来由于深度学习设备算力的大幅提升，深度学习在计算机视觉、自然语言处理...
                      </Paragraph>

                <div>
                  <span>2021年5月31日 | </span>
                  <span>阅读全文{'>'} </span>
                </div>
              </Content>
            </PageHeader>
            <PageHeader
              title="空域图像隐写研究简述"
              className="site-page-header"
              subTitle=""
              tags={[<Tag color="blue">隐写</Tag>]}
              extra={[]}
            >
              <Content
                extraContent={
                  <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                    alt="content"
                    width="100%"
                  />
                }
              >
                <Paragraph>
                  信息隐藏是将秘密信息嵌入到自然载体中而不改变其感知特性，通过载密载体在公开信道上的传递来完成秘密信息的传输。近年来由于深度学习设备算力的大幅提升，深度学习在计算机视觉、自然语言处理...
                      </Paragraph>

                <div>
                  <span>2021年5月31日 | </span>
                  <span>阅读全文{'>'} </span>
                </div>
              </Content>
            </PageHeader>
          </Space>
        </Content>
      </Layout>
    )
  }
}

export default Blog;