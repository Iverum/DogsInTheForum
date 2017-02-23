import React, { Component } from 'react'
import attributify from './player_defined_attributes'

class Traits extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className='row'>
          <h2 className='three columns'>Traits</h2>
          <aside className='nine columns'>{this.props.remainingDice}</aside>
        </div>
        {this.props.children}
      </div>
    )
  }
}

Traits.defaultProps = {
  className: 'six columns'
}

Traits.propTypes = {
  className: React.PropTypes.string
}

export default attributify({ name: 'traits' })(Traits)
