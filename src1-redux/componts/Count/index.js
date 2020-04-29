import React, {
  Component
} from 'react'
import store from '../../redux/store'
import {
  increment,
  decrement
} from '../../redux/action/action'
export default class Count extends Component {
  increment = () => {
    const {
      value
    } = this.refs.count
    store.dispatch(increment(value * 1))
  }
  decrement = () => {
    const {
      value
    } = this.refs.count
    store.dispatch(decrement(value * 1))
  }
  incrementIfOdd = () => {
    const count = store.getState()
    if (count % 2 === 1) {
      const {
        value
      } = this.refs.count
      store.dispatch(increment(value * 1))
    }
  }
  incrementAsync = () => {
    setTimeout(() => {
      const {
        value
      } = this.refs.count
      store.dispatch(increment(value * 1))
    }, 1000);
  }
  render() {
    return ( <
      div >
      <
      h1 > 当前求和为： {
        store.getState()
      } < /h1> <
      select ref = "count" >
      <
      option value = "1" > 1 < /option> <
      option value = "2" > 2 < /option> <
      option value = "3" > 3 < /option> <
      /select> <
      button onClick = {
        this.increment
      } > + < /button>&nbsp; <
      button onClick = {
        this.decrement
      } > - < /button>&nbsp; <
      button onClick = {
        this.incrementIfOdd
      } > increment
      if odd < /button> <
      button onClick = {
        this.incrementAsync
      } > increment async </button> <
        /div>
    )
  }
}