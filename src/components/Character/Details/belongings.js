import React, { Component } from 'react'
import attributify from './player_defined_attributes'

class Belongings extends Component {
  render() {
    return (
      <div className='row'>
        <div className='row'>
          <h2 className='three columns'>Belongings</h2>
        </div>
        {this.props.children}
      </div>
    )
  }
}

Belongings.defaultProps = {
  className: 'row'
}

Belongings.propTypes = {
  className: React.PropTypes.string
}

export default attributify({
  name: 'belongings',
  buttonText: 'New Belonging'
})(Belongings)
