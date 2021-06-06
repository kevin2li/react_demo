import React from 'react';
import { Steps, Typography, Form, Result, Button, Spin, Select, message, Upload, Image, Modal, Table } from 'antd'
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
/* Table columns */

const columns = [
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      sorter: (a, b) => {
          var filename1 = a.image.split('.')[0]
          var filename2 = b.image.split('.')[0]
        // 文件名为数字
          if(!isNaN(filename1) && !isNaN(filename2)){
            return eval(filename1) - eval(filename2)
          }
        // 文件名为字符串 
          if(filename1 > filename2){
            return 1
          }else{
            return -1
          }
      },
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend'
    },
    {
      title: '框架',
      dataIndex: 'framework',
      key: 'framework',
      filters: [
          {
              text: 'pytorch',
              value: 'pytorch'
          },{
              text: 'tensorflow',
              value: 'tensorflow'
          }
      ],
      onFilter: (value, record) => record.framework.indexOf(value) === 0,
    },
    {
        title: '训练数据集',
        dataIndex: 'dataset',
        key: 'dataset',
        filters: [
            {
                text: 'WOW',
                value: 'WOW'
            },{
                text: 'S-UNIWARD',
                value: 'S-UNIWARD'
            },{
                text: 'HILL',
                value: 'HILL'
            },{
                text: 'HUGO',
                value: 'HUGO'
            },{
                text: 'MG',
                value: 'MG'
            },{
                text: 'MVG',
                value: 'MVG'
            },{
                text: 'MiPOD',
                value: 'MiPOD'
            },{
                text: 'UT-GAN',
                value: 'UT-GAN'
            }],
        onFilter: (value, record) => record.dataset.indexOf(value) === 0,
    },
    {
      title: '训练嵌入率',
      dataIndex: 'embedding_rate',
      key: 'embedding_rate',
      filters: [
        {
            text: '0.2 bpp',
            value: '0.2'
        },{
            text: '0.4 bpp',
            value: '0.4',
        },{
            text: '0.8 bpp',
            value: '0.8',
        }],
      onFilter: (value, record) => record.embedding_rate.indexOf(value) === 0,      
    },
    {
      title: '隐写分析模型',
      dataIndex: 'model',
      key: 'model',
      filters: [
        {
            text: 'ZhuNet',
            value: 'ZhuNet'
        },{
            text: 'SRNet',
            value: 'SRNet',
        },{
            text: 'XuNet',
            value: 'XuNet',
        },{
            text: 'YeNet',
            value: 'YeNet',
        },{
            text: 'Yedroudj-Net',
            value: 'YedNet',
        }],
      onFilter: (value, record) => record.model.indexOf(value) === 0,          
    },
    {
      title: '结果',
      children:[
        {
            title: 'Cover',
            dataIndex: 'cover',
            key: 'cover'
        },{
            title: 'Stego',
            dataIndex: 'stego',
            key: 'stego'
        },{
            title: 'Result',
            dataIndex: 'result',
            key: 'result'
        }
      ],
    },
];

class ImageSteganalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            uploadFlieLst: [],
            step_titles: {
                0: ['In Progess', 'Waiting', 'Waiting', 'Waiting'],
                1: ['Finished', 'In Progess', 'Waiting', 'Waiting'],
                2: ['Finished', 'Finished', 'In Progess', 'Waiting'],
                3: ['Finished', 'Finished', 'Finished', 'In Progess'],
            },
            result: null
        }
        this.onFinish = this.onFinish.bind(this);
        this.onChange = this.onChange.bind(this);
        this.formRef = React.createRef();
    }
    next = () => {
        if(this.state.step === 0){
            // 没有上传图片
            if(this.state.uploadFlieLst.length === 0){
                message.warn("请至少上传一张图片!")
            }else{
                this.setState({ step: (this.state.step + 1) % 4 })
            }
        }else if(this.state.step === 1) {
            
        }else if(this.state.step === 2) {
            this.setState({ step: (this.state.step + 1) % 4 })
        }else if(this.state.step === 3) {
            this.setState({ step: (this.state.step + 1) % 4 })
            this.setState({result: null})
            this.setState({uploadFlieLst: []})
        }
    }
    back = ()=>{
        this.setState({step: this.state.step-1})
    }
    /* step2: 表单重置 */
    onReset = () => {
        this.formRef.current.resetFields();
    };
    /* step2：表单上传 */
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
        if(response.data.status === 'ok'){
            this.setState({result: response.data.result})
        }else{
            Modal.error({
                title: 'Error',
                content: '抱歉，服务器内部错误，请重试！',
            });
            this.setState({step: 0})
            this.setState({uploadFlieLst: []})
        }
    }

    /* step1: 上传图片 */
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
        this.setState({uploadFlieLst:[...info.fileList]})
        console.log(this.state.uploadFlieLst)
      }
    render() {
        var content;

        if (this.state.step === 0) {
            const props = {
                name: 'file',
                multiple: true,
                action: '/upload_image',
                onDrop(e) {
                  console.log('Dropped files', e.dataTransfer.files);
                },
            };
            content =  (
                <>
                    {/* <Column {...config}/> */}
                    {/* <Grouped /> */}
                    <div style={{margin:"50px auto 20px", minHeight: '25vh', width: '80vw'}}>
                        <Dragger {...props} onChange={this.onChange} fileList={this.state.uploadFlieLst}>
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
                    <Button onClick={this.next} type='primary' style={{ margin: "20px 0 0" }}>下一步</Button>
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
                            label="训练数据集"
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
                        <Form.Item name={['embedding_rate']} label="训练嵌入率" rules={[{ required: true }]} initialValue='0.4'>
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
                    <Button onClick={this.back} type='default' style={{}}>返回上一步</Button>
                    {/* <Button onClick={this.next} type='primary' style={{}}>下一步</Button> */}
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
                        {/* <Image src={"data:image/png;base64, " + this.state.result.image} /> */}
                        <Table dataSource={this.state.result} columns={columns} bordered pagination={{ position: ['bottomCenter']}}/>
                        </div>
                        <Button onClick={this.next} type='primary' style={{ margin: "10px 0" }}>重新检测</Button>
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