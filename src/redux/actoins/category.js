import { SAVE_CATEGORY } from "../action-type";
import { reqCategoryList } from "@/api/index";
import { message } from "antd";
export const saveCategory = (dataObj)=>({type:SAVE_CATEGORY,data:dataObj})


export const asyncCategory = ()=>{
  return async(dispatch)=>{
    let result = await reqCategoryList()
    const {status,data} = result
    if(status === 0){
      dispatch(saveCategory(data))
    }else{
      message.error('请求出错请联系管理员')
    }
  }
}