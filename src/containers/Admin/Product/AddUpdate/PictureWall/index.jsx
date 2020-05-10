import React, { Component } from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { message} from 'antd'
import {reqImgDele} from '@/api/index'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    //fileList中是所有上传过的文件
    fileList: [
      
    ],
  };
	//预览窗关闭按钮的回调（程序员无需修改）
  handleCancel = () => this.setState({ previewVisible: false });
	//点击预览按钮的回调，("小眼睛按钮"，程序员无需修改)
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async({ file,fileList }) =>{
    const {status,name} = file
    //判断图片是否上传成功为done上传成功
    if(status==='done'){
      const {data,status} = file.response
      if(status===0){
        message.success('添加图片成功')
        const {name,url} = data
        fileList[fileList.length-1].name=name
        fileList[fileList.length-1].url=url
      }else{
        message.error('添加图片失败')
      }
    }else if(status==='removed'){//判断是否删除图片
      let result = await reqImgDele(name)
      const {status,msg} = result
      if(status === 0){
        message.success('删除成功')
      }else{
        message.error(msg)
      }
    }
    this.setState({ fileList });
  } 

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
    
      <div className="clearfix">
        <Upload
          name="image" //文件参数名不写发送请求失败
          action="/api/manage/img/upload"//请求上传地址
          listType="picture-card"//作为照片墙展示,展示类型,不写样式很楼
          fileList={fileList}//图片列表
          onPreview={this.handlePreview}//浏览图片 
          onChange={this.handleChange}//上传图片回调
        >
          {/* {可添加几张图片} */}
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}//对话框是否可见
          title={previewTitle}//标题
          footer={null}//不需要底部内容可以设置为null
          onCancel={this.handleCancel}//监事回掉点击弹框
        >
          {/* {图片} */}
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall