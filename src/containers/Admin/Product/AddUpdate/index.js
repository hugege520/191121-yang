import React, { Component } from 'react'
import { Card, Button,Input,Form,Select,message  } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import { asyncCategory } from "@/redux/actoins/category";
import {reqProductAdd,reqProductInfoById,reqProductAddUpdate} from '@/api/index'
import PictureWall from './PictureWall/index'
import RichText from './RichText'
const {Item} = Form
const { Option } = Select;
@connect(
  state=>({categoryList:state.category}),
  {asyncCategory}
)
 class AddUpdate extends Component {
   state={
    isAddFlan:false,
    productList:{}
   }
   //获取表单数据
  onFinish= async(values)=>{
    values.detail = this.refs.richText.getRichText()
    values.imgs = this.refs.imges.getFileList()
    let result 
    if(this.state.isAddFlan){
      values._id = this._id
      result =  await reqProductAddUpdate(values)
    }else{
      result = await reqProductAdd(values)
    }
    const {msg,status} = result
    if(status === 0){
      message.success(this.state.isAddFlan ?'修改商品成功':'添加商品成功')
      this.props.history.goBack()
    }else{
      message.error(msg)
    }
  }
  //请求商品详情回写数据
  getProductInfoById= async(id)=>{
    let result = await reqProductInfoById(id)
    const {msg,data,status} = result
    if(status === 0){
      this.setState({
        productList:data
      })
      const {categoryId,desc,detail,imgs,name,price} = this.state.productList
      console.log(imgs)
      this.refs.productForm.setFieldsValue({
        categoryId,
        desc,
        name,
        price
      })
      this.refs.imges.getAnswer(imgs)
      this.refs.richText.getAnswerText(detail)
    }else{
      message.error(msg)
    }
   
  }
  componentDidMount(){
    const { id } = this.props.match.params
    if(id){
      this._id=id
      this.getProductInfoById(id)
      this.setState({
        isAddFlan:true
      })
    }
    const {categoryList,asyncCategory} = this.props
    if(categoryList.length===0){
      asyncCategory()
    }
  }
  render() {
    const {categoryList} = this.props
    const { id } = this.props.match.params
    const {isAddFlan} = this.state
    return (
      <div>
        <Card 
          title={
            <div>
              <Button 
              type="primary" 
              onClick={() => { this.props.history.goBack() }}
              >
              <ArrowLeftOutlined />返回
            </Button>
            <span style={{margin:'10px'}}>{isAddFlan?'修改商品':'添加商品'}</span>
            </div>
          } 
        >
          <Form
            ref="productForm"
            initialValues={{categoryId:''}}
            onFinish={this.onFinish}
          >
            <Item
              label="商品名称"
              name="name"
              wrapperCol={{span: 6,}}
              rules={[{ required: true, message: '必填' }]}
            >
              <Input placeholder="商品名称"/>
            </Item>
            <Item
              label="商品描述"
              name="desc"
              wrapperCol={{span: 6,}}
              rules={[{ required: true, message: '必填' }]}
            >
              <Input placeholder="商品描述"/>
            </Item>
            <Item
              label="商品价格"
              name="price"
              wrapperCol={{span: 6,}}
              rules={[{ required: true, message: '必填' }]}
            >
              <Input 
              placeholder="商品价格"
              addonAfter="元" 
              addonBefore="￥" 
              type='number'
              />
            </Item>
            <Item
              label="所属分类"
              name="categoryId"
              wrapperCol={{span: 6,}}
              rules={[{ required: true, message: '必填' }]}
            >
              <Select >
                <Option value="">请选择分类</Option>
                {categoryList.map((v,index)=>{
                  return <Option key={v._id} value={v._id}>{v.name}}</Option>
                })}
              </Select>
            </Item>
            <Item
           
              label="商品图片"
              wrapperCol={{span: 6,}}
              style={{marginLeft:'12px'}}
            >
              <PictureWall ref="imges"/>
            </Item>
            <Item
              label="商品详情"
              wrapperCol={{span: 10,}}
            >
              <RichText  ref="richText"/>
            </Item>
            <Item>
						<Button type="primary" htmlType="submit">提交</Button>
					  </Item>
         </Form>
        </Card>
      </div>
    )
  }
}


export default AddUpdate