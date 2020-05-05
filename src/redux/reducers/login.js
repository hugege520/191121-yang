import { SAVE_USERINFO,DELETE_USERINFO } from '../action-type'

let _user;

try {
  _user=JSON.parse( localStorage.getItem('user'))
} catch (error) {
  _user = null
}
let _token = localStorage.getItem('token')
let initState = {
  token:_token,
  user:_user||{}, //用户信息
  isLogin:_user&&_token ? true:false
}
export default function(preState=initState,action) {
  const {type,data} = action
  let newState
  switch (type) {
    case SAVE_USERINFO:
      newState={...data,isLogin:true}
      return newState
      case DELETE_USERINFO:
      newState={user:{},token:'',isLogin:false}
      return newState
    default:
      return preState
  }
}