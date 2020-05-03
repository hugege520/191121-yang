import { ADDCREMENT } from '../actoin-type'
let person = [{id:'001',name:'张',age:12}]
export default function (per=person,action) {
  const {type,data} = action
  let newState
  switch (type) {
    case ADDCREMENT:
      newState = [data,...per]
      return newState
    default:
      return per
  }
}