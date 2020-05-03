import { INCREMENT,DECREMENT} from '../action-type'
export default function (pre=0,action) {
  const {type,data} = action
  let newState
  switch (type) {
    case INCREMENT:
      newState= pre+data
     return newState
    case DECREMENT:
      newState=pre-data
      return newState
    default:
      return pre
  }
}