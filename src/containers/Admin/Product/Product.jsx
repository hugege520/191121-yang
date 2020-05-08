import React, { Component } from 'react'
import { Card,Button,Select,Input,Table, message  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqProductList,reqProductSearch } from "@/api/index";
const { Option } = Select
export default class Product extends Component {
	state={
		productList:[],
		total:0,
		pageNum:0,
		searchType:'',
		keyWord:''
	}
	componentDidMount(){
		this.getProduct()
	}
	getProduct=async(e=1)=>{
		const {searchType,keyWord} = this.state
		let result
		if(this.isflan){
			result = await reqProductSearch(searchType,keyWord,e,4)
		}else{
			result	= await reqProductList(e,4)
		}
		 
		const {status,data,msg} = result
		if(status === 0){
			this.setState({
				productList:data.list,
				total:data.total,
				pageNum:data.pageNum
			})
		}else{
			message.error(msg)
		}
	}
	render() {
		const {productList} = this.state
		const dataSource = productList
		const columns = [
			{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
			
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
				key: 'desc',
			},
			{
				title: '价格',
				dataIndex: 'price',
				key: 'price',
				render:(price)=>'￥'+ price
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				align:'center',
				render:(e)=>e===1?(
					<div>
						<Button type="primary" danger>
							下架
						</Button><br></br>
						<span>在售</span>
					</div>
				):(<div>
					<Button type="primary">上架</Button><br></br>
					<span>售罄</span>
				</div>)
			},
			{
				title: '操作',
				dataIndex: 'action',
				key: 'address',
				align:'center',
				render:()=>{
					return (
						<div>
							<Button type="link">详情</Button><br/>
							<Button type="link">修改</Button>
						</div>
					)
				}
			},
		];
		return (
			<div>
				<Card 
					title={
						<div>
							<Select 
									defaultValue="name"
									onChange= {value => this.setState({searchType:value})} 
								>
									<Option value="name">请选选择</Option>
									<Option value="productName">按名称搜索</Option>
									<Option value="productDesc">按描述搜索</Option>
							</Select>
							<Input 
								placeholder="搜索关键字" 
								allowClear={true} 
								style={{width:'20%',margin:'10px'}}
								onChange={(e)=>{
									this.setState({
										keyWord:e.target.value
									})
								}}
							/>
							<Button type="primary " onClick={()=>{
								this.isflan = true
								this.getProduct()
							}}>搜索</Button>
						</div>
					}
					extra={
					<Button type="primary"
					>
						<PlusOutlined />加商品
					</Button>}>
					<Table 
						dataSource={dataSource} 
						columns={columns} 
						bordered
						rowKey="_id" //指定唯一值对应项
						pagination={{
							current:this.state.pageNum,
							total:this.state.total,
							pageSize:4,
							onChange:(e)=>{
								this.getProduct(e)
							}
						}}
					/>	
    		</Card>
			</div>
		)
	}
}
