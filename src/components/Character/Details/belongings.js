import React, { Component } from 'react'
import attributify from './player_defined_attributes'

class GunModifierCheckbox extends Component {
  onChange(event) {
    if (!this.props.onChange) { return }
    this.props.onChange('gun', event.target.checked)
  }

  render() {
    return (
      <label className='two columns' style={{ marginTop: '1rem' }}>
        <input type="checkbox" onChange={this.onChange.bind(this)} />
        <span style={{ marginLeft: '1rem' }}>This is a gun</span>
      </label>
    )
  }
}

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
  buttonText: 'New Belonging',
  additionalOption: GunModifierCheckbox
})(Belongings)
