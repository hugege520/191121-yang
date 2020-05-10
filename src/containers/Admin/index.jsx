import React, { Component } from 'react'
import { connect } from "react-redux";
import { Layout } from 'antd';
import { Switch,Route,Redirect } from "react-router-dom";
import {deleUserInfo} from '@/redux/actoins/login'
import Header from './header'
import LeftNav from './LeftNav/index'
import './css/admin.less'
import Check from "@/containers/Hoc/Check";
import Home from './Home/Home'
import Bar from './Bar/Bar'
import Category from './Category/Category'
import Line from './Line/Line'
import Pie from './Pie/Pie'
import Product from './Product/Product'
import Role from './Role/Role'
import User from './User/User'
import AddUpdate from  './Product/AddUpdate/index'
import Detail from './Product/Detail/index'
const {  Footer, Sider, Content } = Layout;
@connect(
  state=>({
    username:state.uesrInfo.user.username,
    isLogin:state.uesrInfo.isLogin
   }),
   {deleUserInfo}
)
@Check
 class Admin extends Component {
  render() {
    return (
      <Layout className="userAdmin">
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content className="content">
              <Switch>
                <Route path="/admin/user" component={User}/>
                <Route path="/admin/home" component={Home}/>
                <Route path="/admin/prod_about/category" component={Category}/>
                <Route path="/admin/prod_about/product" exact component={Product}/>
                <Route path="/admin/role" component={Role}/>
                <Route path="/admin/charts/bar" component={Bar}/>
                <Route path="/admin/charts/line" component={Line}/>
                <Route path="/admin/charts/pie" component={Pie}/>
                <Route path="/admin/prod_about/product/detail/:id" component={Detail}/>
                <Route path="/admin/prod_about/product/addUpdate/:id" component={AddUpdate}/>
                <Route path="/admin/prod_about/product/addUpdate" component={AddUpdate}/>
                <Redirect to="/admin/home"/>
              </Switch>
          </Content>
          <Footer style={{}}>推荐使用谷歌浏览器，获取最佳用户体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
