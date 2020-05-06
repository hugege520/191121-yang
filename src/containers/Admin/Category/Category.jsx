import React, { Component } from 'react'
import { Card, Button,Modal, Form, Input,Table} from 'antd';
import { PlusSquareOutlined} from '@ant-design/icons';
import { connect } from "react-redux";
import { asyncCategory } from "@/redux/actoins/category"
import './css/category.less'
@connect(
	state=>({category:state.category}),
	{asyncCategory}
)
class Category extends Component {
	componentDidMount(){
		this.props.asyncCategory()
	}
	state = { visible: false };
	showModal = () => {
    this.setState({
      visible: true,
    });
	};
	handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
	};
	handleCancel = e => {
    console.log(e);
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
			 	render:()=><Button type="link">修改分类</Button>,
			},
		
		];
		return (
			<div className="category">
				<Card  extra={<Button type="primary" onClick={this.showModal}><PlusSquareOutlined />添加</Button>} >
				<Table 
				dataSource={dataSource} 
				columns={columns} 
				pagination={{
					pageSize:9 //每页展示多少条
				}}
				rowKey="_id" //配置唯一标识
				bordered
				/>
   			</Card>
				 <Modal
          title="新增分类"
          visible={this.state.visible}
          onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText='确认'
					cancelText="取消"
        >
          <Form
						 name="add"
					>
						 <Form.Item
								name="username"
								rules={[{ required: true, message: '必须填' }]}
							>
								<Input  placeholder="添加分类" />
     				 </Form.Item>
					</Form>
        </Modal>
			</div>
		)
	}
}

export default Category