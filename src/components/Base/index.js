import React, { Component } from 'react'
import './index.css'

export default class Base extends Component {

  render() {
    return (
      <div className="Base row">
        <header className="row">
          <h1>Dogs in the Forum</h1>
        </header>
        <section className="row">
          {this.props.children}
        </section>
      </div>
    )
  }

}
