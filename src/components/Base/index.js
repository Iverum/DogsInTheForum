import React, { Component } from 'react'
import './index.css'
import Menu from '../Menu'

export default class Base extends Component {

  render() {
    return (
      <div className="Base row">
        <Menu />
        <section className="row">
          {this.props.children}
        </section>
      </div>
    )
  }

}
