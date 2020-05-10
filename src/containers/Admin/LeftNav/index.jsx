import React, { Component } from 'react'
import { Menu } from 'antd';
import {Link,withRouter} from "react-router-dom";
import { connect } from "react-redux";
import menus from "@/config/menu_config";
import logo from '@/assets/images/logo.png'
import { saveTitle } from "@/redux/actoins/header";
import './css/left.less'
const { SubMenu } = Menu;
@connect(
  state=>({title:state.headerTitle}),
  {saveTitle}
)
@withRouter
 class LeftNav extends Component {
   componentDidMount(){
     //头部title
     const {pathname} = this.props.location
     let currentKey = pathname.split('/');
     let surrentKey = currentKey.slice(-1)[0]
      console.log(surrentKey);
      menus.forEach(v=>{
        if(!v.children){
          if(v.key===surrentKey) {
            this.props.saveTitle(v.title)
          }
        }else if(v.children){
          v.children.find(v=>{
            if(v.key===surrentKey){
              this.props.saveTitle(v.title)
            }
          })
        }
      })
   }
   //头部逻辑
   saveTitle=(title)=>{
    this.props.saveTitle(title)
   }
   //组件展示
  createMenu=(menuArr)=>{
    return menuArr.map(v=>{
      if(!v.children){
        return (
          <Menu.Item key={v.key} onClick={()=>{this.saveTitle(v.title)}}>
            <Link to={v.path}>
              {<v.icon />}
              {v.title}
            </Link>
          </Menu.Item>
        )
      }else if(v.children){
          return (
            <SubMenu key={v.key} icon={<v.icon />} title={v.title}>
              {this.createMenu(v.children)}
            </SubMenu>
          )
      }
    })
  }
  render() {
    const {pathname} = this.props.location
    let openedkey = pathname.split('/')
    let checkedKey 
    if(openedkey.indexOf('product')!==-1)checkedKey='product'
    else checkedKey=openedkey.slice(-1)
    return (
      <div className="leftNav">
        <div className="topNav">
          <img src={logo}/>
          <span>商品管理系统</span>
        </div>
        <div >
        <Menu
            selectedKeys={checkedKey}
            defaultOpenKeys={openedkey}
            mode="inline"
            theme="dark"
        >
            {this.createMenu(menus)}
        </Menu>
      </div>
      </div>
    )
  }
}

export default LeftNav