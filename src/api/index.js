import axios from './Ajax'
//请求登录的函数,loginObj形如：{username:'xx',password:'xx'}
export const reqLogin = (loginObj)=>axios.post('/login',loginObj)