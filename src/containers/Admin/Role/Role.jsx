import React, { Component } from 'react'
import {Card,Button,Table,Modal,Form,Input,Tree ,message} from 'antd'
import dayjs from 'dayjs'
import {PlusCircleOutlined} from '@ant-design/icons';
import {reqRoleList,reqRoleAdd,reqRoleUpdate} from '@/api/index'
import tolr from '@/config/menu_role'
const {Item} = Form
const { TreeNode } = Tree;
export default class Role extends Component {

	state = { 
		visibleList: false, //弹窗是否展示
		roleList:[],
		menus:[],
		visible:false
	};
	componentDidMount(){
		this.getRoleList()
	}
//请求角色列表
	getRoleList=async()=>{
		let result = await reqRoleList()
		const {status,data,msg} = result
		if(status === 0){
			this.setState({
				roleList:data
			})
		}else{
			message.error(msg)
		}
	}
	//展示弹窗
	showModalList = () => {
    this.setState({visibleList: true});
	};
	//权限弹窗
	showModal = (_id,name) => {
		this._id = 	_id;
		this.name = name
		const {roleList,menus}= this.state
		let arr =[]
		let result = roleList.find(v=>{
			return v._id === this._id
		})
		if(result.menus.indexOf('home')===-1) arr.push('home')
		result.menus.forEach(v=>{
			arr.push(v)
		})
    this.setState({visible: true,menus:arr});
	};
	
	
	//弹窗确认按钮回调
	handleOkList = async() => {
		const roleName = this.refs.name.getFieldValue()
		let result = await reqRoleAdd(roleName)
		const {status,msg} = result
		if(status===0){
			message.success('添加角色成功')
			this.getRoleList()
			this.setState({visibleList: false});
		}else{
			message.error(msg)
		}
	};
	//权限确认
	handleOk = async () => {
		const {menus}=this.state
		let result = await reqRoleUpdate(this._id,menus)
		const {data,status,msg} = result
		if(status === 0){
			message.success('添加授权成功')
		}else{
			message.error(msg)
		}
		this.setState({visible: false});
	};
	
	//弹窗取消按钮回调
	handleCancelList = () => {
    this.setState({visibleList: false});
	};
	//权限取消
	handleCancel = () => {
    this.setState({visible: false});
	};
	menusArr=(menus)=>{
		this.setState({
			menus
		})
	}
	render() {
		//表格数据源
		const dataSource = this.state.roleList
		//表格列配置
		const columns = [
			{
				title: '角色名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				key: 'create_time',
				render:(create_time)=>dayjs(create_time).format('YYYY年 MM月-DD日 HH:mm:ss')
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				key: 'auth_time',
				render:(auth_time)=>auth_time?dayjs(auth_time).format('YYYY年 MM月-DD日 HH:mm:ss'):''
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
				key: 'auth_name',
			},
			{
				title: '操作',
				// dataIndex: '_id',
				key: 'action',
				align:'center',
				render:(id)=>{
					const {_id,name} = id
					return <Button type="link" onClick={()=>{this.showModal(_id,name)}}>设置权限</Button>
				} 
			},
		];
		//设置权限
		const treeData = tolr
		return (
			<div>
				{/* Card组件 */}
				<Card 
					title={<Button onClick={this.showModalList} type="primary"><PlusCircleOutlined />新增角色</Button>}
				>
					<Table
						dataSource={dataSource} //数据源
						columns={columns} //列配置
						bordered //边框
						rowKey='_id'
					/>
				</Card>
				{/* 新增角色Modal弹窗 */}
				<Modal
          title="新增角色" //弹窗标题
          visible={this.state.visibleList} //是否展示弹窗
          onOk={this.handleOkList} //确认回调
					onCancel={this.handleCancelList} //关闭回调
					okText="确认"
					cancelText="取消"
        >
          <Form
						ref="name"
						labelCol={{span:4}}
						wrapperCol={{span:18}}
					>
						<Item
							name="roleName"
							label="角色名"
							rules={[{required:true,message:'角色名必须输入'}]}
						>
							<Input placeholder="角色名"/>
						</Item>
					</Form>
        </Modal>

				{/* //权限 */}
				<Modal
          title="新增角色" //弹窗标题
          visible={this.state.visible} //是否展示弹窗
          onOk={this.handleOk} //确认回调
					onCancel={this.handleCancel} //关闭回调
					okText="确认"
					cancelText="取消"
        >
           <Tree
					 	checkable={true}
						treeData={treeData}
						defaultCheckedKeys={this.state.menus}
						defaultExpandAll={true}//默认展开所有树节点
						onCheck={(e)=>{this.menusArr(e)}}
    			/>
        </Modal>
			</div>
		)
	}
}

