import React from 'react';
import { Layout } from 'antd';
import BG from '../assets/images/bg.png'
const {Content } = Layout;


const baseStyle1 = {
  minHeight: '93vh',
  display: 'flex',
  // height: '100%',
  width: '100%',
  textAlign: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  backgroundImage: `url(${BG})`,
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