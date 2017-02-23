import React, { Component } from 'react'

export default class Traits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      traits: props.traits
    }
  }

  getRemainingTraitDice() {
    const { traitDice } = this.props
    let remainingTraitDice = ''
    traitDice.forEach(dice => {
      remainingTraitDice += `${dice.number}${dice.size} `
    })
    remainingTraitDice += 'left to assign'
    return remainingTraitDice
  }

  renderTraits() {
    let traitRows = []
    this.state.traits.forEach(trait => {
      const diceDescription = `${trait.dice.number}${trait.dice.size}`
      traitRows.push((
        <div key={trait.text} className='row'>
          <input className='two columns' type='text' placeholder='2d6' value={diceDescription} />
          <input className='ten columns' type='text' placeholder="I'm a good shot" value={trait.text} />
        </div>
      ))
    })
    return traitRows
  }

  render() {
    console.log(this.props, this.state)
    return (
      <div className={this.props.className}>
        <div className='row'>
          <h2 className='three columns'>Traits</h2>
          <aside className='nine columns'>{this.getRemainingTraitDice()}</aside>
        </div>
        {this.renderTraits()}
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
