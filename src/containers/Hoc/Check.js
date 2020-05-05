import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


export default function(ReciveComponent) {
  @connect(
    state=>({
      isLogin:state.uesrInfo.isLogin
    }),
    {}
  )
  class TargetComponent extends Component {
    render() {
      const {pathname} = this.props.location;
      const {isLogin} = this.props
      if(!isLogin && pathname!=='/login') return <Redirect to='/login' />
      if(isLogin&&pathname==='/login') return <Redirect to='/admin'/>
      return <ReciveComponent {...this.props}/>
    }
  }
  return TargetComponent
}