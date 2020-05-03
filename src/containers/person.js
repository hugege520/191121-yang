import React,{Component} from 'react'
import { connect } from "react-redux";
import { add_person } from "../redux/actions/person";

class Person extends Component{
  addPerson=()=>{
    const {name,age} = this.refs;
    if(!name.value||name.age){
      alert('bune')
      return 
    }
    this.props.add_person({id:Date.now(),name:name.value,age:age.value})
  }
  render(){
    return (
      <div>
        <h1>{this.props.count},{this.props.sho.length}</h1>
        <input type="text" ref="name"/>
        <input type="text" ref="age"/>
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {this.props.sho.map(v=>{
            return<li key={v.id}>姓名:{v.name},age:{v.age}</li>
          })}
       
        </ul>
      </div>
    )
  }
}
export default connect(
  state=>({
    count:state.number,
    sho:state.person
  }),
  {add_person}
)(Person)
