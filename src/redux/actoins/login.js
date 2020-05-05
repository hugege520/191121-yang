import { SAVE_USERINFO, DELETE_USERINFO} from "../action-type";

export const saveUserInfo = userObj=>{
  const {user,token}=userObj
  localStorage.setItem('user',JSON.stringify(user))
  localStorage.setItem('token',token)
  return{type:SAVE_USERINFO,data:userObj}
}

export const deleUserInfo = ()=>{
  localStorage.clear();
  return {type:DELETE_USERINFO}
}