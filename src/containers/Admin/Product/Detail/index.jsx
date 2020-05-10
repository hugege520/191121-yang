import React, { Component } from 'react'
import { Card, Button, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqProductInfoById } from '@/api'
import { IMAGE_BASE_URL } from "@/config/index";
import { connect } from "react-redux";
import { asyncCategory } from "@/redux/actoins/category";
const { Item } = List
@connect(
  state => ({ category: state.category }),
  { asyncCategory }
)
class Detail extends Component {
  state = {
    infoById: { imgs: [] }
  }
  componentDidMount() {
    this.getInfoById()
    if (this.props.category.length === 0) {
      this.props.asyncCategory()
    }
  }
  //请求详情列表
  getInfoById = async () => {
    const { id } = this.props.match.params
    let result = await reqProductInfoById(id)
    const { status, data, msg } = result
    if (status === 0) {
      this.setState({
        infoById: data
      })
    }
  }
  //分类
  findCategoryName = (id) => {
    const { category } = this.props
    let title
    category.find(v => {
      if (v._id === id) {
        title = v.name
      }
    })
    return title
  }
  render() {
    console.log(this.state.infoById)
    const { name, desc, price, categoryId, detail, imgs } = this.state.infoById
    return (
      <div>
        <Card
          title={
            <div>
              <Button
                onClick={() => { this.props.history.goBack() }}
                type="link"
              >
                <ArrowLeftOutlined />返回
          </Button>
              <span>商品详情</span>
            </div>
          }
        >
          <List>
            <Item>
              <span>商品名称：</span>
              <span>{name}</span>
            </Item>
            <Item>
              <span>商品描述：</span>
              <span>{desc}</span>
            </Item>
            <Item>
              <span>商品价格：</span>
              <span>￥{price}</span>
            </Item>
            <Item>
              <span>商品分类：</span>
              <span>{this.findCategoryName(categoryId)}</span>
            </Item>
            <Item>
              <span>商品图片：</span>
              <span>
                {imgs.map((v, index) => {
                  return <img src={IMAGE_BASE_URL + v} key={index} />
                })}
              </span>
            </Item>
            <Item>
              <span>商品详情：</span>
              <span dangerouslySetInnerHTML={{ __html: detail }}></span>
            </Item>
          </List>
        </Card>
      </div>
    )
  }
}

export default Detail