import React, { Component } from 'react'

export default class Traits extends Component {

  getRemainingTraitDice() {
    const { traitDice } = this.props
    let remainingTraitDice = ''
    traitDice.forEach(dice => {
      remainingTraitDice += `${dice.number}${dice.size} `
    })
    remainingTraitDice += 'left to assign'
    return remainingTraitDice
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className='row'>
          <h2 className='three columns'>Traits</h2>
          <aside className='nine columns'>{this.getRemainingTraitDice()}</aside>
        </div>
        <div className='row'>
          <input className='two columns' type='text' placeholder='2d6' />
          <input className='ten columns' type='text' placeholder="I'm a good shot" />
        </div>
        <input className='button' type='button' value='New Trait' />
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
