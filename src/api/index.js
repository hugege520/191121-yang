import axios from './Ajax'
import jsonp from 'jsonp'
import { message } from "antd";
import { SU_ZHOU,JS_ON,A_K } from "@/config/index";
//请求登录的函数,loginObj形如：{username:'xx',password:'xx'}
export const reqLogin = (loginObj)=>axios.post('/login',loginObj)

//天气预报
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
//请求分类列表
export const reqCategoryList = ()=>axios.get('/manage/category/list')

//发送添加分类
export const reqCategoryUsername = categoryName=>axios.post('/manage/category/add',{categoryName})
//修改分类
export const reqCategoryAction = (categoryId,categoryName)=>axios.post('/manage/category/update',{categoryId,categoryName})

//请求商品品列表
export const reqProductList = (pageNum,pageSize)=>axios.get('/manage/product/list',{params:{pageNum,pageSize}})

//搜索商品列表
export const reqProductSearch = (searchType,keyWord,pageNum,pageSize) =>axios.get('/manage/product/search',{params:{[searchType]:keyWord,pageNum,pageSize}})

//请求商品下架和上架

export const reqProductUpdateStatus = (productId,status)=>axios.post('/manage/product/updateStatus',{productId,status})
//请求商品详情
export const reqProductInfoById = (productId)=>axios.get('/manage/product/info',{params:{productId}})
//删除图片
export const reqImgDele=(name)=>axios.post('/manage/img/delete',{name})


