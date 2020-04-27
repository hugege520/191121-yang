import React, { Component } from 'react'
import { Button,DatePicker  } from 'antd';
const { RangePicker } = DatePicker;
export default class App extends Component {
  render() {
    return (
      <div>
        App
        <Button type="primary">Button</Button>
        <RangePicker />
      </div>
    )
  }
}