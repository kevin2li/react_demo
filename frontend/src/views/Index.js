import React from 'react';
import { Layout } from 'antd';
const {Content } = Layout;


const baseStyle1 = {
  //   minHeight: '600px',
  height: '100%',
  width: '100%',
  lineHeight: '400px',
  textAlign: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  //   backgroundImage: img_urls[0],
  //   backgroundImage: 'url(https://2021.baai.ac.cn/assets/img/bg.jpg)',
  //   backgroundImage: 'url(https://cdn.wallpapersafari.com/20/84/It6uUS.jpg)',
  backgroundImage: 'url(https://th.bing.com/th/id/R914c0cefaea861e735ce139770e648ec?rik=Safa%2fSvB8Mh4Ig&pid=ImgRaw)',
}
class Index extends React.Component {

  render() {
    return (
      <Layout>
        <Content
          className="site-layout-background"
        >
          <div style={baseStyle1}></div>
        </Content>
      </Layout>
    )
  }
}

export default Index