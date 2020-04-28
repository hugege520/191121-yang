import React, { Component } from 'react'
import { Form, Input, Button, } from 'antd';
import {reqLogin} from '../../api/index'
import logo from './images/logo.png'
import './css/login.less'
const {Item} = Form
export default class Login extends Component {
  onFinish=async (value)=>{
    console.log(value)
   
      let result = await reqLogin(value)
      console.log(result);
 
  }

  pwdValidator=(_,value)=>{
    let errMsgArr = []
    if(!value.trim()) return Promise.reject('用户名必须输入') 
    if(value.length<4) errMsgArr.push('用户名必须大于等于4位')
    if(value.length>12) errMsgArr.push('用户名必须小于等于12位')
    if(!(/^\w+$/).test(value)) errMsgArr.push('用户名必须是英文、数字、下划线组成')
    if(errMsgArr) return Promise.reject(errMsgArr)
    else return Promise.resolve()
  }
  render() {
    return (
      <div id="login">
        <header>
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <span className='title'>用户登录</span>
          {/*
						用户名/密码的的合法性要求
							1). 必须输入
							2). 必须大于等于4位
							3). 必须小于等于12位
							4). 必须是英文、数字、下划线组成
						*/
						}
        <Form onFinish={this.onFinish}>
          <Item
          className="logi1"
            name="username"
            rules={[
              {required:true,message:'用户名必须输入'},
              {min:4,message:'用户名必须大于等于4位'},
              {max:12,message:'用户名必须小于等于12位'},
              {pattern:/^\w+$/,message:'用户名必须是英文、数字、下划线组成'},
            ]}
          >
            <Input placeholder="用户名" />
          </Item>
          <Item name="password" 
            rules={[
              {validator:this.pwdValidator}
            ]}
          >
            <Input placeholder="密码" />
          </Item>
          <Item >
            <Button type="primary" htmlType="submit" className="btn">
              登录
            </Button>
          </Item>
      </Form>
        </section>
      </div>
    )
  }
}
