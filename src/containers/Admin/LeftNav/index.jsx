import React, { Component } from 'react'
import { Menu } from 'antd';
import menus from "@/config/menu_config";
import logo from '@/assets/images/logo.png'
import './css/left.less'
const { SubMenu } = Menu;
export default class LeftNav extends Component {
  createMenu=(menuArr)=>{
    return menuArr.map(v=>{
      if(!v.children){
        return (
          <Menu.Item key={v.key} icon={<v.icon />}>
            {v.title}
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
    return (
      <div className="leftNav">
        <div className="topNav">
          <img src={logo}/>
          <span>商品管理系统</span>
        </div>
        <div >
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
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
