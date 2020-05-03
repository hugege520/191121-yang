import { ADD_PERSON } from "../action-type";
let arrPerson =[{id:'001',name:'样',age:12}]
export default function (per=arrPerson,action) {
  const {type,data} = action
  switch (type) {
    case ADD_PERSON:
      let newState
      newState=[data,...per]
     return newState
    default:
      return per;
  }
}