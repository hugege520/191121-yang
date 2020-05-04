import axios from 'axios'
import qs from 'querystring' //用于将对象转为urlencoded字符串
import {message as msg} from 'antd'

//配置请求的基础路径
axios.defaults.baseURL = '/api'
//配置超时时间
axios.defaults.timeout = 2000

axios.interceptors.request.use((config)=>{
  const {method,data} = config
  console.log(config)
  //统一处理post请求json编码问题（转为urlencoded）
  if(method.toLowerCase()==='post'&&data instanceof Object){
    config.data=qs.stringify(data)
  }
  return config
})  

axios.interceptors.response.use(
  response=>{
    return response.data
  },
  err=>{
    let errmsg = '未知错误，请联系管理员'
    const {message} = err
    if(message.indexOf('401')!==-1) errmsg= '未登录或身份过期，请重新登录!'
    else if(message.indexOf('Network Error'))errmsg = '网络不通，请检查网络连接！'
    else if(message.indexOf('timeout')) errmsg = '网络不稳定，连接超时！'
    msg.error(errmsg,1)
    return new Promise(()=>{})
  }
)
export default axios