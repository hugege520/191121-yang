import { SAVE_TITLE } from "../action-type";

let title = ''
export default function (prestate=title,action) {
  const {type,data} = action
  let newState
  switch (type) {
    case SAVE_TITLE:
      newState = data
      return newState
    default:
      return prestate
  }
}