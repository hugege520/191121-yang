import React, { Component } from 'react'
import { Card, Button,Input,Form,Select  } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import { asyncCategory } from "@/redux/actoins/category";
import PictureWall from './PictureWall/index'
const {Item} = Form
const { Option } = Select;
@connect(
  state=>({categoryList:state.category}),
  {asyncCategory}
)
 class AddUpdate extends Component {
   //获取表单数据
  onFinish=(value)=>{
    console.log(value)
  }
  componentDidMount(){
    const {categoryList,asyncCategory} = this.props
    if(categoryList.length===0){
      asyncCategory()
    }
  }
  render() {
    const {categoryList} = this.props
    const { id } = this.props.match.params
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
            <span style={{margin:'10px'}}>{id?'修改商品':'添加商品'}</span>
            </div>
          } 
        >
          <Form
            initialValues={{categoryId:''}}
            onFinish={this.onFinish}
          >
            <Item
              label="商品名称"
              name="username"
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
              <Input placeholder="商品价格"/>
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
              <PictureWall />
            </Item>
            <Item
              label="商品详情"
              wrapperCol={{span: 6,}}
            >
              此处放置富文本编辑器
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