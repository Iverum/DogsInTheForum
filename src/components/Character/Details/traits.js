import React, { Component } from 'react'
import _ from 'lodash'
import cn from 'classnames'

export default class Traits extends Component {
  constructor(props) {
    super(props)
    this.regExp = this.createDiceRegex(props)
    this.state = {
      traits: props.traits,
      errors: []
    }
  }

  createDiceRegex(props = this.props) {
    const traitDice = props.traitDice.slice(1)
    const dieSizes = traitDice.reduce((accumulator, value) => {
      return `${accumulator}|${value.size}`
    }, props.traitDice[0].size)
    return new RegExp(`(\\d*)(${dieSizes})`)
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

  getTraitDiceString(trait) {
    if (!trait || !trait.dice) { return '' }
    if (typeof trait.dice === 'string') {
      return trait.dice
    } else if (trait.dice instanceof Object) {
      return `${trait.dice.number}${trait.dice.size}`
    }
    return ''
  }

  changeTraitDice(traitIndex, newValue) {
    const match = this.regExp.exec(newValue)
    let errors = [...this.state.errors]
    if (match === null) {
      this.setState({
        errors: _.uniq([...errors, traitIndex])
      })
    } else {
      errors = _.filter(errors, traitIndex)
      this.setState({ errors })
      if (errors.length !== 0) { return }
      const newTraits = [...this.state.traits]
      const newTrait = {
        ...newTraits[traitIndex],
        dice: { number: parseInt(match[1], 10) || 1, size: match[2] }
      }
      newTraits[traitIndex] = newTrait
      this.props.onChange('stats', newTraits)
    }
  }

  renderTraits() {
    const { errors } = this.state
    let traitRows = []
    this.state.traits.forEach((trait, index) => {
      traitRows.push((
        <div key={trait.text} className='row'>
          <input
            className={cn({
              'two columns': true,
              'error': _.includes(errors, index)
            })}
            type='text'
            placeholder='2d6'
            value={this.getTraitDiceString(trait)}
            onChange={event => {
              let traits = [...this.state.traits]
              traits[index].dice = event.target.value
              this.setState({ traits })
            }}
            onBlur={event => {
              this.changeTraitDice(index, event.target.value)
            }}
          />
          <input
            className='ten columns'
            type='text'
            placeholder="I'm a good shot"
            value={trait.text}
          />
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
