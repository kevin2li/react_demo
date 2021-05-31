import React from 'react';
import UploadComponent from './Upload'
import { Steps, Typography, Form, Input, Button, Spin, Select, message, Space } from 'antd'
import axios from 'axios'

const { Step } = Steps;
const { Title } = Typography;
const { Option, OptGroup } = Select;

// Form begin
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
// const onFinish = (values) => {
//     console.log(values);
// };
// Form end


class ImageSteganalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            step_titles: {
                0: ['In Progess', 'Waiting', 'Waiting', 'Waiting'],
                1: ['Finished', 'In Progess', 'Waiting', 'Waiting'],
                2: ['Finished', 'Finished', 'In Progess', 'Waiting'],
                3: ['Finished', 'Finished', 'Finished', 'In Progess'],
            }
        }
        this.onFinish = this.onFinish.bind(this)
    }
    next = () => {
        this.setState({ step: (this.state.step + 1) % 4 })
    }

    async onFinish(values){
        console.log(values)
        var bodyFormData = new FormData()
        bodyFormData.append('framework', values.framework)
        bodyFormData.append('dataset', values.dataset)
        bodyFormData.append('embedding_rate', values.embedding_rate)
        bodyFormData.append('models', values.models)
        const response = await axios({
          method: "post",
          url: "/predict",
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
        alert(response.data.status)
        this.setState({ step: (this.state.step + 1) % 4 })
    }
    render() {
        if (this.state.step === 0) {
            return (
                <div>
                    <Typography>
                        <Title>图像隐写分析Demo</Title>
                    </Typography>
                        <Steps current={this.state.step}>
                            <Step title={this.state.step_titles[this.state.step][0]} description="上传可疑图片" />
                            <Step title={this.state.step_titles[this.state.step][1]} subTitle="" description="选择隐写分析模型" />
                            <Step title={this.state.step_titles[this.state.step][2]} description="检测" />
                            <Step title={this.state.step_titles[this.state.step][3]} description="查看结果" />
                        </Steps>
                        <UploadComponent></UploadComponent>
                        <Button onClick={this.next} type='primary' style={{margin:"50px 0"}}>next</Button>
                </div>
            )
        } else if (this.state.step === 1) {
            return (
                <div>
                    <Typography>
                        <Title>图像隐写分析Demo</Title>
                    </Typography>
                    <Steps current={this.state.step}>
                        <Step title={this.state.step_titles[this.state.step][0]} description="上传可疑图片" />
                        <Step title={this.state.step_titles[this.state.step][1]} subTitle="" description="选择隐写分析模型" />
                        <Step title={this.state.step_titles[this.state.step][2]} description="检测" />
                        <Step title={this.state.step_titles[this.state.step][3]} description="查看结果" />
                    </Steps>
                    <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages} style={{margin: "50px 0"}}>
                        <Form.Item name={['framework']} label="框架" rules={[{ required: true }]}>
                            <Select placeholder="select framework" defaultValue='pytorch'>
                                <Option value="pytorch">pytorch</Option>
                                <Option value="tensorflow">tensorflow</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="dataset"
                            label="数据集"
                            rules={[{ required: true, message: 'Please select dataset!' }]}
                        >
                            <Select placeholder="select dataset" defaultValue='WOW'>
                                <OptGroup label="自适应隐写">
                                    <Option value="WOW">WOW</Option>
                                    <Option value="SUNIWARD">SUNIWARD</Option>
                                    <Option value="HILL">HILL</Option>
                                    <Option value="HUGO">HUGO</Option>
                                    <Option value="MG">MG</Option>
                                    <Option value="MVG">MVG</Option>
                                    <Option value="MiPOD">MiPOD</Option>
                                </OptGroup>
                                <OptGroup label="深度学习隐写">
                                    <Option value="UT-GAN">UT-GAN</Option>
                                </OptGroup>
                            </Select>
                        </Form.Item>
                        <Form.Item name={['embedding_rate']} label="嵌入率" rules={[{ required: true }]}>
                            <Select placeholder="select embedding rate" defaultValue='0.4'>
                                <Option value="0.2">0.2 bpp</Option>
                                <Option value="0.4">0.4 bpp</Option>
                                <Option value="0.6">0.6 bpp</Option>
                                <Option value="0.8">0.8 bpp</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="models"
                            label="隐写分析模型"
                            rules={[{ required: true, message: 'Please select model!' }]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select model"
                                defaultValue={['ZhuNet']}
                            >
                                <Option value="ZhuNet">ZhuNet</Option>
                                <Option value="SRNet">SRNet</Option>
                                <Option value="YedNet">Yedroudj-Net</Option>
                                <Option value="YeNet">YeNet</Option>
                                <Option value="XuNet">XuNet</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit" onFinish={this.onFinish}>
                                开始检测
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button onClick={this.next} type='primary' style={{margin:"50px 0"}}>next</Button>
                </div>
            )
        } else if (this.state.step === 2) {
            return (
                <div>
                    <Typography>
                        <Title>图像隐写分析Demo</Title>
                    </Typography>
                    <Steps current={this.state.step}>
                        <Step title={this.state.step_titles[this.state.step][0]} description="上传可疑图片" />
                        <Step title={this.state.step_titles[this.state.step][1]} subTitle="" description="选择隐写分析模型" />
                        <Step title={this.state.step_titles[this.state.step][2]} description="检测" />
                        <Step title={this.state.step_titles[this.state.step][3]} description="查看结果" />
                    </Steps>
                    <div>
                        <Spin style={{margin:"50px 0"}}/>检测中,请稍候...<br />
                    </div>
                    <Button onClick={this.next} type='primary' style={{margin:"50px 0", padding:"0 30px"}}>next</Button>
                </div>
            )
        } else if (this.state.step === 3) {
            return (
                <div>
                    <Typography>
                        <Title>图像隐写分析Demo</Title>
                    </Typography>
                    <Steps current={this.state.step}>
                        <Step title={this.state.step_titles[this.state.step][0]} description="上传可疑图片" />
                        <Step title={this.state.step_titles[this.state.step][1]} subTitle="" description="选择隐写分析模型" />
                        <Step title={this.state.step_titles[this.state.step][2]} description="检测" />
                        <Step title={this.state.step_titles[this.state.step][3]} description="查看结果" />
                    </Steps>
                    <Button onClick={this.next} type='primary' style={{margin:"50px 0"}}>next</Button>
                </div>
            )
        }
    }
}

export default ImageSteganalysis