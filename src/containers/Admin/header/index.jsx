import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import screenfull from 'screenfull'
import { connect } from 'react-redux'
import dayjs from "dayjs";
import { deleUserInfo } from '@/redux/actoins/login'
import { reqWeatherData } from "@/api/index";
import './css/header.less'
const { confirm } = Modal;
@connect(
  state => ({
    username: state.uesrInfo.user.username,
    isLogin: state.uesrInfo.isLogin,
    title:state.headerTitle
  }),
  { deleUserInfo }
)
class Header extends Component {
  state = {
    isflang: false,
    dayPictureUrl: '',//图片
    temperature: '',//温度@
    weather: '' ,//天气
    tirme:dayjs().format('YYYY年 MM月-DD日 HH:mm:ss')//时间
  }
  componentDidMount() {
    //全屏
    screenfull.onchange(() => {
      this.setState({
        isflang: !this.state.isflang
      })
    });
    // //天气
    // this.tianqi()
    //时间
    this.timer=setInterval(() => {
      this.setState({
        tirme:dayjs().format('YYYY年 MM月-DD日 HH:mm:ss')//时间
      })
    }, 1000);
  }
  //组件销毁前
  componentWillUnmount(){
    clearInterval(this.timer)
  }
    //天气
  tianqi = async () => {
    let result = await reqWeatherData()
    this.setState({
      weather:result.weather,
      dayPictureUrl:result.dayPictureUrl,
      temperature:result.temperature
    })
  }
  fullScreen = () => {
    screenfull.request();
  }
  login = () => {
    confirm({
      title: '确定退出登陆吗?',
      icon: <ExclamationCircleOutlined />,
      content: '退出后需要重新登录',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.deleUserInfo()
      },
    });
  }
  titleHeadr=()=>{
    let {title} = this.props
    if(!title)title='商品管理'
    return title
  }

  render() {
    return (
      <div className="header">
        <div className="headerTop">
          <Button size="small" onClick={this.fullScreen}>
            {this.state.isflang ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
          </Button>
          <span className="username">欢迎,{this.props.username}</span>
          <Button type="link" size="small" onClick={this.login}>退出登录</Button>
        </div>
        <div className="headerBottom">
          <div className="bottomLeft">
            <span>{this.titleHeadr()}</span>
          </div>
          <div className="bottomRight">
            <span>{this.state.tirme}</span>
            <img src={this.state.dayPictureUrl} alt="" />
            <span>{this.state.weather}</span>
            <span>温度：{this.state.temperature}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
