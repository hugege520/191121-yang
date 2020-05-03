import {INCREMENT,DECREMENT,ADDCREMENT} from '../actoin-type'

export const increment = value=>({type:INCREMENT,data:value})
export const decrement = value=>({type:DECREMENT ,data:value})
export const addPerson = value=>({type:ADDCREMENT,data:value})
//异步action
//store底层加了判断，如果action是函数就立刻调用，且传入store.dispatch
export const incrementAsync = (value,time)=>{
  return (dispatch)=>{
    setTimeout(() => {
      dispatch(increment(value))
    }, time);
  }
}