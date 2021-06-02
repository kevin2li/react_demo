import React from 'react';
import {Typography, Form, Input, Button, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;
// 文本隐写分析
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
const onFinish = (values) => {
    console.log(values);
};

class TextSteganalysis extends React.Component {

    render() {
        return (
            <>
                <Typography>
                    <Title style={{ textAlign: 'center' }}>文本隐写分析Demo</Title>
                </Typography>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={['user', 'text']} label="可疑文本" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="model"
                        label="隐写分析模型"
                        rules={[{ required: true, message: 'Please select model!' }]}
                    >
                        <Select placeholder="select model">
                            <Option value="rnn">RNN</Option>
                            <Option value="cnn">CNN</Option>
                            <Option value="transformer">Transformer</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            开始检测
                                </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default TextSteganalysis
