import React from "react";
import {
  Typography,
  Upload,
  Radio,
  Form,
  Button,
  Select,
  message,
  Modal,
  Input,
  Steps,
  Spin,
  Result,
  Image,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "../Axios";
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

// Form begin
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */
// Form end

class TextStega extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      status: "",
      uploadFlieLst: [],
      type: "embed",
      step_titles: {
        0: ["In Progess", "Waiting", "Waiting", "Waiting"],
        1: ["Finished", "In Progess", "Waiting", "Waiting"],
        2: ["Finished", "Finished", "In Progess", "Waiting"],
      },
      image_data: null,
      message: "",
    };
    this.formRef = React.createRef();
  }
  /* 表单重置 */
  onReset = () => {
    this.formRef.current.resetFields();
    this.setState({ type: "embed", uploadFlieLst: [] });
  };
  onFileChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    this.setState({ uploadFlieLst: [...info.fileList] });
    console.log(this.state.uploadFlieLst);
  };
  onTypeChange = (e) => {
    const type = e.target.value;
    this.setState({
      type: type,
    });
  };
  /* 表单上传 */
  onFinish = async (values) => {
    console.log(values);
    this.next();
    var bodyFormData = new FormData();
    for (let file of this.state.uploadFlieLst) {
      console.log(file.name);
      bodyFormData.append("img_list", file.originFileObj);
    }
    bodyFormData.append("type", values.type);
    bodyFormData.append("model", values.model);
    bodyFormData.append("message", values.message);
    // const response = await Axios({
    //   method: "post",
    //   url: "/traditional_stega",
    //   data: bodyFormData,
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    // console.log(response.data);
    // if (response.data.status === "ok") {
    //   this.setState({ status: "ok" });
    //   if (values.type === "embed") {
    //     this.setState({ image_data: response.data.result.image_data });
    //   } else {
    //     this.setState({ message: response.data.result.message });
    //   }
    // } else {
    //   Modal.error({
    //     title: "Error",
    //     content: "抱歉，服务器内部错误，请重试！",
    //   });
    //   this.setState({ step: 0 });
    //   this.setState({ uploadFlieLst: [] });
    // }
  };
  next = () => {
    if (this.state.step === 2) {
      this.setState({
        uploadFlieLst: [],
        image_data: null,
        message: "",
        status: "",
        type: "embed",
      });
    }
    this.setState({ step: (this.state.step + 1) % 3 });
  };
  render() {
    var content;
    if (this.state.step === 0) {
      content = (
        <>
          {" "}
          <Form
            {...layout}
            ref={this.formRef}
            name="nest-messages"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            validateMessages={validateMessages}
            style={{ margin: "30px 0 0 0" }}
          >
            <Form.Item
              name="category"
              label="类别"
              rules={[{ required: true, message: "Please select category!" }]}
              initialValue={"gen"}
            >
            <Radio.Group defaultValue="gen">
              <Radio.Button value="gen">生成式隐写</Radio.Button>
              <Radio.Button value="sub" disabled>替换式隐写</Radio.Button>
            </Radio.Group>
            </Form.Item>
            <Form.Item
              name="model"
              label="模型"
              rules={[{ required: true, message: "Please select model!" }]}
              initialValue={["A"]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select model"
              >
                <Option value="A">A</Option>
                <Option value="B" disabled>
                  B
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="type"
              label="类型"
              rules={[{ required: true, message: "Please select type!" }]}
              initialValue={"embed"}
            >
              <Radio.Group value="embed" onChange={this.onTypeChange}>
                <Radio value="embed" checked>
                  嵌入
                </Radio>
                <Radio value="extract">提取</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="message"
              label= {this.state.type === "embed" ? "秘密信息": "密文信息"}
              rules={[
                {
                  required: true,
                  message: "Please input secret message!",
                },
              ]}
            >
              <Input.TextArea placeholder="e.g. 0101101010101" rows={4} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" disabled>
                提交
              </Button>
              <Button htmlType="button" onClick={this.onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </>
      );
    } else if (this.state.step === 1) {
      content = (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              height: "50px",
              lineHeight: "50px",
              margin: "40px 0 0 0",
              visibility: this.state.status ? "hidden" : "visible",
              display: this.state.status ? "none" : "block",
            }}
          >
            <Spin style={{ padding: "0 30px" }} />
            <span>处理中,请稍候...</span>
            <br />
          </div>
          <Result
            status="success"
            title="处理完成!"
            subTitle=""
            extra={[
              <Button type="primary" key="console" onClick={this.next}>
                查看结果
              </Button>,
            ]}
            style={{ visibility: this.state.status ? "visible" : "hidden" }}
          />
        </div>
      );
    } else if (this.state.step === 2) {
      const download = () => {
        const link = document.createElement("a");
        link.href = 'data:application/octet-stream;base64, ' + this.state.image_data;
        link.download = "result.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      if (this.state.type === "embed") {
        content = (
          <>
            <div style={{ textAlign: "center" }}>
              <Image src={"data:image/png;base64, " + this.state.image_data} />
            </div>
            <div style={{ textAlign: "center", margin: "30px auto" }}>
              <Space>
                <Button type="primary" onClick={download}>
                  下载图片
                </Button>
                <Button type="primary" onClick={this.next}>
                  重新开始
                </Button>
              </Space>
            </div>
          </>
        );
      } else {
        content = (
          <>
            <div style={{ textAlign: "center", height: "80px", lineHeight: "80px", fontSize: "20px", margin: "30px auto" }}>
              <Typography>
                <Paragraph>
                  <Text strong>秘密信息:</Text>
                  <Text>{this.state.message}</Text>
                </Paragraph>
              </Typography>
            </div>
            <div style={{ textAlign: "center" }}>
              <Button type="primary" onClick={this.next}>
                重新开始
              </Button>
            </div>
          </>
        );
      }
    }
    return (
      <>
        <div style={{ textAlign: "center", margin: "30px 0 0 0" }}>
          <Typography>
            <Title>文本隐写示例</Title>
            <blockquote>说明：正在开发中...</blockquote>
          </Typography>
        </div>
        <Steps
          current={this.state.step}
          style={{ width: "65vw", margin: "30px auto" }}
        >
          <Step
            title={this.state.step_titles[this.state.step][0]}
            description="确定参数"
          />
          <Step
            title={this.state.step_titles[this.state.step][2]}
            description="处理"
          />
          <Step
            title={this.state.step_titles[this.state.step][3]}
            description="查看结果"
          />
        </Steps>
        {content}
      </>
    );
  }
}

export default TextStega;
