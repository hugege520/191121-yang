import React, { Component } from 'react'
import {connect} from 'react-redux'
import { increment,decrement,incrementAsync } from "../redux/actions/action";
class Count extends Component {
  increment=()=>{
    const {value} = this.refs.count
    this.props.increment(value*1)
  }
  decrement=()=>{
    const {value} = this.refs.count
    this.props.decrement(value*1)
  }
  incrementIfOdd=()=>{
    const {value} = this.refs.count
    if(this.props.count%2===1){
      this.props.increment(value*1)
    }
  }
  incrementAsync=()=>{
    const {value} = this.refs.count
    this.props.incrementAsync(value*1,2000)
  }
  render() {
    return (
      <div>
        <h1>总和:{this.props.count}</h1>
        <select ref="count">
          <option value="1">1</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementIfOdd}>incrementIfOdd</button>
        <button onClick={this.incrementAsync}>incrementAsync</button>
      </div>
    )
  }
}
export default connect(
  state=>({
    count:state.number
  }),
  {increment,decrement,incrementAsync}
)(Count)