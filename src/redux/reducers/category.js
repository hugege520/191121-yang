import { SAVE_CATEGORY } from "../action-type";
let arrCategory = []

export default function (preState=arrCategory,action) {
  const {type,data} = action
  let newState
  switch (type) {
    case SAVE_CATEGORY:
      newState= data
      return newState
    default:
     return preState
  }
}