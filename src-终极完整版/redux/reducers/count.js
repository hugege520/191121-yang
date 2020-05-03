export default function (pre=0,action) {
  const {type,data} = action

  let newState
  switch (type) {
    case 'increment':
      newState=pre+data
      return newState
    case 'decrement':
      newState=pre-data
      return newState
    default:
      return pre
  }
}