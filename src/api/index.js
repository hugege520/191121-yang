import axios from './Ajax'
import jsonp from 'jsonp'
import { message } from "antd";
import { SU_ZHOU,JS_ON,A_K } from "@/config/index";
//请求登录的函数,loginObj形如：{username:'xx',password:'xx'}
export const reqLogin = (loginObj)=>axios.post('/login',loginObj)


export const reqWeatherData = ()=>{
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${SU_ZHOU}&output=${JS_ON}&ak=${A_K}`
  return new Promise ((resolve)=>{
    jsonp(url,{
      timeout:2000
    },(err,data)=>{
      if(!err){
        resolve(data.results[0].weather_data[0])
      }else{
        message.error('请求出错请联系管理员')
      }
    })
  })
}