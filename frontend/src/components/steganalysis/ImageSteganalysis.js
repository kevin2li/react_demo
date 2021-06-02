import React from 'react';
import { Steps, Typography, Form, Result, Button, Spin, Select, message, Upload, Image } from 'antd'
import axios from 'axios'
import { InboxOutlined } from '@ant-design/icons';
const { Step } = Steps;
const { Title, Paragraph} = Typography;
const { Option, OptGroup } = Select;
const { Dragger } = Upload;

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
            },
            result: null
        }
        this.onFinish = this.onFinish.bind(this);
        this.formRef = React.createRef();
    }
    next = () => {
        this.setState({ step: (this.state.step + 1) % 4 })
        if(this.state.step === 3) {
            this.setState({result: null})
        }
    }
    onReset = () => {
        this.formRef.current.resetFields();
    };
    async onFinish(values) {
        console.log(values)
        this.setState({ step: (this.state.step + 1) % 4 })
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
        // alert(response.data.result)
        console.log(response.data.result)
        this.setState({result: response.data.result})
    }
    render() {
        var content;

        if (this.state.step === 0) {
            const props = {
                name: 'file',
                multiple: true,
                action: '/upload_image',
                onChange(info) {
                  const { status } = info.file;
                  if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                  }
                  if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
            
                  } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                },
                onDrop(e) {
                  console.log('Dropped files', e.dataTransfer.files);
                },
            };            
            content =  (
                <>
                    <div style={{margin:"50px 0"}}>
                        <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                        </Dragger>
                    </div>
                    <Button onClick={this.next} type='primary' style={{ margin: "20px 0" }}>next</Button>
                </>
            )
        } else if (this.state.step === 1) {
            content = (
                <>
                    <Form {...layout} ref={this.formRef} name="nest-messages" initialValues={{ remember: true }} onFinish={this.onFinish} validateMessages={validateMessages} style={{ margin: "30px 0 0 0" }}>
                        <Form.Item name={['framework']} label="框架" rules={[{ required: true }]} initialValue='pytorch'>
                            <Select placeholder="select framework" defaultValue='pytorch'>
                                <Option value="pytorch">pytorch</Option>
                                <Option value="tensorflow">tensorflow</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="dataset"
                            label="数据集"
                            rules={[{ required: true, message: 'Please select dataset!' }]}
                            initialValue='WOW'
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
                        <Form.Item name={['embedding_rate']} label="嵌入率" rules={[{ required: true }]} initialValue='0.4'>
                            <Select placeholder="select embedding rate">
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
                            initialValue='ZhuNet'
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
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit" onFinish={this.onFinish}>
                                提交
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button onClick={this.next} type='primary' style={{}}>next</Button>
                </>
            )
        } else if (this.state.step === 2) {
            content =  (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ height: '50px', lineHeight: '50px', margin: '40px 0 0 0', visibility: this.state.result ? 'hidden': 'visible', display: this.state.result ? 'none' : 'block'}}>
                            <Spin style={{padding: "0 30px" }} /><span>检测中,请稍候...</span><br />
                        </div>
                        <Result
                            status="success"
                            title="检测完成!"
                            subTitle=""
                            extra={[
                                <Button type="primary" key="console" onClick={this.next}>
                                    查看结果
                                </Button>,
                                // <Button key="buy">Buy Again</Button>,
                            ]}
                            style={{visibility: this.state.result ? 'visible': 'hidden'}}
                        />
                    </div>
            )
        } else if (this.state.step === 3) {
            content = <>
                        <div style={{ textAlign: 'center', margin: '30px 0 0 0' }}>
                        <Image src={"data:image/png;base64, " + this.state.result.image} />
                        </div>
                        <Button onClick={this.next} type='primary' style={{ margin: "10px 0" }}>next</Button>
                    </>
        }
        return (
            <>
            <Typography>
                <Title style={{ textAlign: 'center' }}>图像隐写分析示例</Title>
                {/* <Paragraph>图像隐写分析是检测图像中是否含有秘密信息的关键技术，本平台提供了五种隐写分析模型(ZhuNet、SRNet、XuNet、YeNet、Yedroudj-Net)在8种隐写数据集(WOW、S-UNIWARD、UT-GAN等)上的预训练模型，欢迎使用！</Paragraph> */}
            </Typography>
            <Steps current={this.state.step}>
                <Step title={this.state.step_titles[this.state.step][0]} description="上传可疑图片" />
                <Step title={this.state.step_titles[this.state.step][1]} subTitle="" description="选择隐写分析模型" />
                <Step title={this.state.step_titles[this.state.step][2]} description="检测" />
                <Step title={this.state.step_titles[this.state.step][3]} description="查看结果" />
            </Steps>
                {content}
            </>
        )
    }
}

export default ImageSteganalysis