import axios from './Ajax'
import jsonp from 'jsonp'
import { message } from "antd";
import store from '@/redux/store'
import { SU_ZHOU,JS_ON,A_K } from "@/config/index";

const {username} = store.getState().uesrInfo.user

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

//请求添加商品

export const reqProductAdd = (productObj) =>axios.post('/manage/product/add',productObj)

//请求跟新商品
export const reqProductAddUpdate=(productObj)=>axios.post('/manage/product/update',productObj)

//请求角色列表
export const reqRoleList = ()=>axios.get('/manage/role/list')
//添加角色
export const reqRoleAdd = (roleName)=>axios.post('/manage/role/add',roleName)
//请求更新授权

export const reqRoleUpdate = (_id,menus)=>axios.post('/manage/role/update',{_id,auth_name:username,menus,auth_time:Date.now()})
//请求用户列表
export const reqUserList = ()=>axios.get('/manage/user/list')
//添加用户

export const reqUserAdd = (userObj)=>axios.post('/manage/user/add',userObj)
//删除用户
export const reqUserDele = (userId)=>axios.post('/manage/user/delete',{userId})


