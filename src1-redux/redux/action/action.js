import {INCREMENT,DECREMENT} from '../actoin-type'

export const increment = value=>({type:INCREMENT,data:value})
export const decrement = value=>({type:DECREMENT  ,data:value})