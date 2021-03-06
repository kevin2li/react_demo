import React from 'react';
import { Space, Steps, Typography, Form, Result, Button, Spin, Select, message, Upload, Modal, Table } from 'antd'
import { InboxOutlined, DownloadOutlined } from '@ant-design/icons';
import GroupedBar from './GroupedBar';
import Axios from '../Axios'

const { Step } = Steps;
const { Title} = Typography;
const { Option, OptGroup } = Select;
const { Dragger } = Upload;

// Form begin
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
/* eslint-disable no-template-curly-in-string */
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
/* eslint-enable no-template-curly-in-string */
// copy form: https://www.akashmittal.com/react-convert-json-to-csv/
const JSONToCSVConvertor = (JSONData, ShowLabel) => {
  //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
  var arrData =
      typeof JSONData !== "object" ? JSON.parse(JSONData) : JSONData;

  var CSV = "";

  //This condition will generate the Label/Header
  if (ShowLabel) {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
      //Now convert each value to string and comma-seprated
      row += index + ",";
      }

      row = row.slice(0, -1);

      //append Label row with line break
      CSV += row + "\r\n";
  }

  //1st loop is to extract each row
  for (var i = 0; i < arrData.length; i++) {
      var row = "";

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
      row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + "\r\n";
  }

  if (CSV === "") {
      alert("Invalid data");
      return;
  }
  return CSV
}

/* Table columns */
const columns = [
    {
      title: '??????',
      dataIndex: 'image',
      key: 'image',
      sorter: (a, b) => {
          var filename1 = a.image.split('.')[0]
          var filename2 = b.image.split('.')[0]
        // ??????????????????
          if(!isNaN(filename1) && !isNaN(filename2)){
            return eval(filename1) - eval(filename2)
          }
        // ????????????????????? 
          if(filename1 > filename2){
            return 1
          }else{
            return -1
          }
      },
      onFilter: (value, record) => record.framework.indexOf(value) === 0,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend'
    },
    {
      title: '??????',
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
        title: '???????????????',
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
      title: '???????????????',
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
      title: '??????????????????',
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
      title: '??????',
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
            status: '',
            result: null,
            init_data: [],
            selected_data: []
        }
        this.formRef = React.createRef();
    }
    next = () => {
        if(this.state.step === 0){
            // ??????????????????
            if(this.state.uploadFlieLst.length === 0){
                message.warn("???????????????????????????!")
            }else{
                this.setState({ step: (this.state.step + 1) % 4 })
            }
        }else if(this.state.step === 1) {
            
        }else if(this.state.step === 2) {
            var data = []
            for (let i of this.state.result){
                var label = [i['image'], i['framework'], i['embedding_rate'], i['dataset'], i['model']].join('-')
                data.push({
                    label: label, 'cover': i['cover'], 'stego': i['stego']
                })
            }
            this.setState({init_data: data})
            this.setState({ step: (this.state.step + 1) % 4 })
        }else if(this.state.step === 3) {
            this.setState({ step: (this.state.step + 1) % 4 })
            this.setState({status: ''})
            this.setState({selected_data: []})
            this.setState({uploadFlieLst: []})
        }
    }
    back = ()=>{
        this.setState({step: this.state.step-1})
    }
    /* step2: ???????????? */
    onReset = () => {
        this.formRef.current.resetFields();
    };
    /* step2??????????????? */
    onFinish = async (values) => {
        console.log(values)
        this.setState({ step: (this.state.step + 1) % 4 })
        var bodyFormData = new FormData()
        for(let file of this.state.uploadFlieLst){
            console.log(file.name)
            bodyFormData.append('img_list', file.originFileObj)
        }
        bodyFormData.append('framework', values.framework)
        bodyFormData.append('dataset', values.dataset)
        bodyFormData.append('embedding_rate', values.embedding_rate)
        bodyFormData.append('models', values.models)
        const response = await Axios({
            method: "post",
            url: "/predict", 
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data"},
        })
        console.log(bodyFormData.getAll('img_list'))
        console.log(response.data)
        if(response.data.status === 'ok'){
            this.setState({status: 'ok'})
            this.setState({result: response.data.result})
        }else{
            Modal.error({
                title: 'Error',
                content: '?????????????????????????????????????????????',
            });
            this.setState({step: 0})
            this.setState({uploadFlieLst: []})
        }
    }

    /* step1: ???????????? */
    onChange = (info) => {
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
    
    /* ???????????? */
    onSelectChange = (selectedRowKeys, selectedRows) => {
      console.log('selectedRowKeys:', selectedRowKeys, 'selectedRows: ', selectedRows);
      var data = []
      for(let row of selectedRows){
          // console.log("row:", row)
          const label = [row['image'], row['framework'], row['embedding_rate'], row['dataset'], row['model']].join('-')
          // console.log('label:', label)
          data.push({
            label: label,
            'cover': row['cover'],
            'stego': row['stego']
          })
      }
      // console.log("data:", data)
      this.setState({
        selected_data: data
      })
    }

    render() {
        var content;
        if (this.state.step === 0) {
            const props = {
                name: 'file',
                multiple: true,
                action: '',
                onDrop(e) {
                  console.log('Dropped files', e.dataTransfer.files);
                },
            };
            content =  (
                <>
                    {/* <Demo data={data}/> */}
                    <div style={{margin:"50px auto 20px", minHeight: '25vh', width: '80vw'}}>
                        <Dragger {...props} onChange={this.onChange} beforeUpload={(f, fList) => false} fileList={this.state.uploadFlieLst}>
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
                    <Button onClick={this.next} type='primary' style={{ margin: "20px 6vw 0" }}>?????????</Button>
                </>
            )
        } else if (this.state.step === 1) {
            content = (
                <>
                    <Form {...layout} ref={this.formRef} name="nest-messages" initialValues={{ remember: true }} onFinish={this.onFinish} validateMessages={validateMessages} style={{ margin: "30px 0 0 0" }}>
                        {/* <Form.Item name={['framework']} label="??????" rules={[{ required: true }]} initialValue='pytorch'>
                            <Select placeholder="select framework">
                                <Option value="pytorch">pytorch</Option>
                                <Option value="tensorflow">tensorflow</Option>
                            </Select>
                        </Form.Item> */}
                        <Form.Item
                            name="dataset"
                            label="???????????????"
                            rules={[{ required: true, message: 'Please select dataset!' }]}
                            initialValue={['WOW']}
                        >
                            <Select mode="multiple" placeholder="select dataset">
                                <OptGroup label="???????????????">
                                    <Option value="WOW">WOW</Option>
                                    <Option value="S-UNIWARD">S-UNIWARD</Option>
                                    <Option value="HILL">HILL</Option>
                                    <Option value="HUGO">HUGO</Option>
                                    <Option value="MG">MG</Option>
                                    <Option value="MVG">MVG</Option>
                                    <Option value="MiPOD">MiPOD</Option>
                                </OptGroup>
                                <OptGroup label="??????????????????">
                                    <Option value="UT-GAN">UT-GAN</Option>
                                </OptGroup>
                            </Select>
                        </Form.Item>
                        <Form.Item name={['embedding_rate']} label="???????????????" rules={[{ required: true }]} initialValue={['0.4']}>
                            <Select mode="multiple" placeholder="select embedding rate">
                                <Option value="0.2" disabled>0.2 bpp</Option>
                                <Option value="0.4">0.4 bpp</Option>
                                <Option value="0.6" disabled>0.6 bpp</Option>
                                <Option value="0.8" disabled>0.8 bpp</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="models"
                            label="??????????????????"
                            rules={[{ required: true, message: 'Please select model!' }]}
                            initialValue={['XuNet']}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select model"
                            >
                                <Option value="ZhuNet">ZhuNet</Option>
                                <Option value="SRNet" disabled>SRNet</Option>
                                <Option value="YedNet">Yedroudj-Net</Option>
                                <Option value="YeNet">YeNet</Option>
                                <Option value="XuNet">XuNet</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                ??????
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button onClick={this.back} type='default' style={{marginLeft:"13vw"}}>???????????????</Button>
                </>
            )
        } else if (this.state.step === 2) {
            content =  (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ height: '50px', lineHeight: '50px', margin: '40px 0 0 0', visibility: this.state.status ? 'hidden': 'visible', display: this.state.status ? 'none' : 'block'}}>
                            <Spin style={{padding: "0 30px" }} /><span>?????????,?????????...</span><br />
                        </div>
                        <Result
                            status="success"
                            title="????????????!"
                            subTitle=""
                            extra={[
                                <Button type="primary" key="console" onClick={this.next}>
                                    ????????????
                                </Button>,
                            ]}
                            style={{visibility: this.state.status ? 'visible': 'hidden'}}
                        />
                    </div>
            )
        } else if (this.state.step === 3) {
            const rowSelection = {
                onChange: this.onSelectChange,
            }
            const download = () => {
              var url = window.URL.createObjectURL(
                new Blob([JSONToCSVConvertor(this.state.result, true)], {type:'data:text/csv;charset=utf-8'}),
              );
              const link = document.createElement('a');
              link.href = url;
              link.download = "result.csv";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
            var data = this.state.selected_data.length === 0 ? this.state.init_data : this.state.selected_data
            content = <>
                        <div style={{ textAlign: 'center', margin: '30px 0 0 0' }}>
                          <Typography>
                            <Title level={4}>?????????</Title>
                          </Typography>
                          <GroupedBar data={data} height={data.length * 30 > 400 ? data.length * 30 : 400} width={1200}/>
                          {/* <Image src={"data:image/png;base64, " + this.state.result.image} /> */}
                          <Typography>
                            <Title level={4}>???????????????</Title>
                          </Typography>
                          <Table rowSelection={{type: 'checkbox', ...rowSelection,}} dataSource={this.state.result} columns={columns} bordered pagination={{ position: ['topLeft']}}/>
                        </div>
                        <Space>
                          <Button type="primary" icon={<DownloadOutlined />} onClick={download} size='default'>?????????CSV</Button>
                          <Button onClick={this.next} type='primary' style={{ margin: "10px 0" }}>????????????</Button>
                        </Space>
                    </>
        }
        return (
            <>
            <Typography>
                <Title style={{ textAlign: 'center' }}>????????????????????????</Title>
                <blockquote style={{ textAlign: 'center' }}>??????????????????256??256?????????????????????</blockquote>
                {/* <Paragraph>????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????(ZhuNet???SRNet???XuNet???YeNet???Yedroudj-Net)???8??????????????????(WOW???S-UNIWARD???UT-GAN???)???????????????????????????????????????</Paragraph> */}
            </Typography>
            <Steps current={this.state.step} style={{ width: "65vw", margin: "30px auto" }}>
                <Step title={this.state.step_titles[this.state.step][0]} description="??????????????????" />
                <Step title={this.state.step_titles[this.state.step][1]} subTitle="" description="????????????????????????" />
                <Step title={this.state.step_titles[this.state.step][2]} description="??????" />
                <Step title={this.state.step_titles[this.state.step][3]} description="????????????" />
            </Steps>
            {content}
            </>
        )
    }
}

export default ImageSteganalysis