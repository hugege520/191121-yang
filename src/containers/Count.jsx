//2.引入connect方法(重点)
import {connect} from 'react-redux'
import Count from '../componts/Count'
import {increment,decrement} from '../redux/action/action'

// function mapStateToProps(state) {
//   return {
//     count:state
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     increment:(value)=>{dispatch(increment(value))},
//     decrement:(value)=>{dispatch(decrement(value))}
//   }
// }

export default connect(
  state=>({count:state}),
  {increment,decrement}
)(Count)