import React, { Component } from 'react'
import {Card,Button,Table,Modal,Form,Input,Select,message} from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons';
import { reqUserList,reqUserAdd,reqUserDele } from "@/api/index";
import dayjs from 'dayjs'

const {Item} = Form
const {Option} = Select

export default class User extends Component {
	state = { 
		visible: false, //弹窗是否展示
		users:[],
		roles:[],
		isflan:false
	};
	componentDidMount(){
		this.getUserList()
	}
	//请求用户列表
	getUserList=async()=>{
		let result = await reqUserList()
		const {status,data,msg} = result
		if(status === 0 ){
			this.setState({
				users:data.users,
				roles:data.roles
			})
		}else{
			message.error(msg)
		}
	}
	//展示弹窗
	showModal = (e) => {
		const {_id,email,password,phone,role_id,username} = e
		this.email = ''
		this.password = ''
		this.phone = ''
		this.role_id = ''
		this.username = ''
		this.isFlan = false
		if(_id ){
			this.email = email
			this.password = password
			this.phone = phone
			this.role_id = role_id
			this.username = username
			this.setState({isflan:true})
			if(this.refs.userFrom){
				this.refs.userFrom.setFieldsValue({
					email,
					password,
					phone,
					role_id,
					username,
				})
			}
		}
    this.setState({visible: true});
	};
	
	//弹窗确认按钮回调
	handleOk = async() => {
		const userObj = this.refs.userFrom.getFieldValue()
		console.log(userObj)
		if(!userObj.role_id || !userObj.username ||!userObj.password ){
			message.success('不能为空')
			return 
		}
		let result = await reqUserAdd(userObj)
		const {status,msg} = result
		if(status === 0){
			this.setState({visible: false});
			message.success('添加用户成功')
			this.getUserList()
			this.refs.userFrom.resetFields()
		}else{
			message.error(msg)
			this.refs.userFrom.resetFields()
		}
	};
	
	//弹窗取消按钮回调
	handleCancel = () => {
		this.refs.userFrom.resetFields()
    this.setState({visible: false});
  };
	//计算用户
	getRous=(id)=>{
		let result = this.state.roles.find(v=>v._id === id)
		if(result){
			return result.name
		}
	}
	//删除用户
	getUserDele=async(e)=>{
		const {_id} = e
		let result= await reqUserDele(_id)
		const {status,msg} = result
		if(status === 0){
			this.getUserList()
			message.success('删除用户成功')
		}else{
			message.error(msg)
		}
	}
	render() {
		//表格数据源
		const dataSource = this.state.users
		//表格列配置
		const columns = [
			{
				title: '姓名',
				dataIndex: 'username',
				key: 'username',
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: '电话',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: '注册时间',
				dataIndex: 'create_time',
				key: 'create_time',
				render:(create_time)=>dayjs(create_time).format('YYYY年 MM月-DD日 HH:mm:ss')
			},
			{
				title: '所属角色',
				dataIndex: 'role_id',
				key: 'role_id',
				render:(role_id)=>this.getRous(role_id)
			},
			{
				title: '操作',
				//dataIndex: 'role_id',
				key: 'action',
				align:'center',
				render:(e)=>{
					
					return (
					<div>
						<Button type="link" onClick={()=>{this.showModal(e)}}>修改</Button>
						<Button type="link" onClick={()=>{this.getUserDele(e)}}>删除</Button>
					</div>
					)
			}
			},
		];
		return (
			<div>
				{/* Card组件 */}
				<Card 
					title={<Button onClick={this.showModal} type="primary"><PlusCircleOutlined />新增用户</Button>}
				>
					<Table
						dataSource={dataSource} //数据源
						columns={columns} //列配置
						bordered //边框
						rowKey="_id"
					/>
				</Card>
				{/* Modal弹窗 */}
				<Modal
          title="新增用户" //弹窗标题
          visible={this.state.visible} //是否展示弹窗
          onOk={this.handleOk} //确认回调
					onCancel={this.handleCancel} //关闭回调
					okText="确认"
					cancelText="取消"
        >
          <Form
						name='userFrom'
						ref="userFrom"
						labelCol={{span:4}}
						wrapperCol={{span:18}}
						initialValues={{
							role_id:this.role_id,
							username:this.username,
							password:this.password,
							phone:this.phone,
							email:this.email
						}}
					>
						<Item
							name="username"
							label="用户名"
							rules={[{required:true,message:'用户名必须输入'}]}
						>
							<Input placeholder="用户名"/>
						</Item>
						<Item
							name="password"
							label="密码"
							rules={[{required:true,message:'密码必须输入'}]}
						>
							<Input placeholder="密码"/>
						</Item>
						<Item
							name="phone"
							label="手机号"
						
						>
							<Input placeholder="手机号"/>
						</Item>
						<Item
							name="email"
							label="邮箱"
					
						>
							<Input placeholder="邮箱"/>
						</Item>
						<Item
							name="role_id"
							label="角色"
							rules={[{required:true,message:'用户名必须输入'}]}
						>
							<Select>
								<Option value="">请选择分类</Option>
								{this.state.roles.map((v,index)=>{
									return <Option key={index} value={v._id}>{v.name}</Option>
								})}
							</Select>
						</Item>
					</Form>
        </Modal>
			</div>
		)
	}
}
