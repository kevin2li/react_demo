import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios'

const { Dragger } = Upload;
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
    // async customRequest({data, file, filename, action}){
    //   var bodyFormData = new FormData()
    //   bodyFormData.append('file', data, filename)
    //   const response =  await axios({
    //     method: "post",
    //     url: "/predict",
    //     data: bodyFormData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   alert(response.data.status)
    // }
};

  
class UploadComponent extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
        return (
          <div style={{margin:"50px 0", height:"285px"}}>
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
        )
    }
}

export default UploadComponent