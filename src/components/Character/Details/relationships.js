import React, { Component } from 'react'
import attributify from './player_defined_attributes'

class Relationships extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className='row'>
          <h2 className='three columns'>Relationships</h2>
          <aside className='nine columns'>{this.props.remainingDice}</aside>
        </div>
        {this.props.children}
      </div>
    )
  }
}

Relationships.defaultProps = {
  className: 'row'
}

Relationships.propTypes = {
  className: React.PropTypes.string
}

export default attributify({ name: 'relationships' })(Relationships)
