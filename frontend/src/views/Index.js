import React from 'react';
import { Layout } from 'antd';
const {Content } = Layout;


const baseStyle1 = {
  minHeight: '93vh',
  display: 'flex',
  // height: '100%',
  width: '100%',
  textAlign: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  backgroundImage: 'url(https://th.bing.com/th/id/R914c0cefaea861e735ce139770e648ec?rik=Safa%2fSvB8Mh4Ig&pid=ImgRaw)',
}
class Index extends React.Component {

  render() {
    return (
      <Layout style={{height: '100%' }}>
        <Content
          className="site-layout-background"
        >
          <div style={baseStyle1}>
            
          </div>
        </Content>
      </Layout>
    )
  }
}

export default Index