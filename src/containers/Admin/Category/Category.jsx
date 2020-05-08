import React, { Component } from 'react'
import { Card, Button,Modal, Form, Input,Table, message} from 'antd';
import { PlusSquareOutlined} from '@ant-design/icons';
import { connect } from "react-redux";
import { asyncCategory } from "@/redux/actoins/category"
import { reqCategoryUsername,reqCategoryAction } from "@/api/index";
import './css/category.less'
@connect(
	state=>({category:state.category}),
	{asyncCategory}
)
class Category extends Component {
	state = { visible: false };
	componentDidMount(){
		this.props.asyncCategory()
	}
//弹框
	showModal = (e) => {
		const {_id,name} = e;
		this.id=""
		this.name=""
		this.isFlan = false
		if(_id&&name){
			this.name=name;
			this.id = _id;
			this.isFlan = true
		}
		if(this.refs.categoryFrom)this.refs.categoryFrom.setFieldsValue({name:this.name})
    this.setState({
      visible: true,
    });
	};
	handleOk = async()=> {
		const {name} = this.refs.categoryFrom.getFieldsValue()
		if(!name||!name.trim()){
			message.error('输入不能为空',1)
		}else{
			let result 
			if(this.isFlan){
				result = await reqCategoryAction(this.id,name)
			}else{
				result = await reqCategoryUsername(name)
			}
			const {status,data,msg} = result
			console.log(data)
			if(status === 0){
				message.success('添加分类成功')
				this.props.asyncCategory()
				this.setState({visible: false});
				this.refs.categoryFrom.resetFields()
			}else{
				message.error(msg)
			}
		}
	};
	handleCancel = ()=> {
		this.refs.categoryFrom.resetFields()
    this.setState({
      visible: false,
    });
  };
	render() {
		const dataSource = this.props.category
		const columns = [
			{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '操作',
				width:'20%',
				align:'center',
			 	render:(e)=>{
					 return <Button type="link" onClick={()=>{this.showModal(e)}}>修改分类</Button>
				 },
			},
		
		];
		return (
			<div className="category">
				<Card  extra={<Button type="primary" onClick={this.showModal}><PlusSquareOutlined />添加</Button>} >
				<Table 
				dataSource={dataSource} 
				columns={columns} 
				pagination={{
					pageSize:4 //每页展示多少条
				}}
				rowKey="_id" //配置唯一标识
				bordered
				/>
   			</Card>
				 <Modal
          title={this.isFlan?'修改分类':'新增分类'}
          visible={this.state.visible}
          onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText='确认'
					cancelText="取消"
        >
          <Form
						 ref='categoryFrom'
						 initialValues={{name:this.name}}
					>
						 <Form.Item
								name="name"
								rules={[{ required: true, message: '必须填' }]}
							>
								<Input  placeholder={this.isFlan?'修改分类':'添加分类'} />
     				 </Form.Item>
					</Form>
        </Modal>
			</div>
		)
	}
}

export default Category