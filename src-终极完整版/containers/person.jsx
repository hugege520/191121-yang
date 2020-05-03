import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPerson} from '../redux/action/action'
class Person extends Component {
  addPerson=()=>{
    const {name,age} = this.refs
    if(!name.value||!age.value){
      alert('不能为空')
      return
    }
    this.props.addPerson({id:Date.now(),name:name.value,age:age.value})
  }
  render() {
    console.log(this.props.shu)
    const {shu} = this.props
    return (
      <div>
        <h1>总人数:{shu.length},总和{this.props.count}</h1>
        <input type="text"  placeholder="输入名字" ref="name"/>
        <input type="text" placeholder="输入年龄" ref="age"/>
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {shu.map(v=>{
            return <li key={v.id}>姓名:{v.name},年龄:{v.age}</li>
          })}
        </ul>
      </div>
    )
  }
}


export default  connect(
  state=>({
    count:state.number,
    shu:state.person
  }),
  {addPerson}
)(Person)