import React, { Component, PropTypes } from 'react';
import './index.css'
import images from './images'

export default class Hand extends Component {

  groupItems(perRow = 4) {
    const groups = []
    let group = []
    this.props.dice.forEach(item => {
      if (group.length === perRow) {
        groups.push(group)
        group = [ item ]
      } else {
        group.push(item)
      }
    })
    if (group.length > 0) {
      groups.push(group)
    }
    return groups
  }

  renderDie(die, index) {
    if (!die) { return null }
    const key = `die-${index}`
    switch (die.type) {
      case 'd6': {
        return (
          <div className='die' key={key}>
            <img src={images.d6[die.value-1]} width="50" height="50" alt="{die.type} with value of {die.value}" />
          </div>
        )
      }

      default: {
        return <p className='die' key={key}>{die.value}</p>
      }
    }
  }

  renderDice(perRow = this.props.dicePerRow) {
    const groups = []
    let group = []
    this.props.dice.forEach((die, index) => {
      if (group.length === perRow) {
        groups.push(group)
        group = [this.renderDie(die, index)]
      } else {
        group.push(this.renderDie(die, index))
      }
    })
    if (group.length > 0) {
      groups.push(group)
    }
    return groups.map((group, index) => {
      const key = `group-${index}`
      return <div key={key} className='diceGroup'>{group}</div>
    })
  }

  render() {
    return (
      <div className='dice'>
        <p className='caption'>{this.props.caption}</p>
        {this.renderDice()}
      </div>
    )
  }

}

Hand.defaultProps = {
  dicePerRow: 10,
  caption: ''
}

Hand.propTypes = {
  dicePerRow: PropTypes.number,
  dice: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20']),
    value: PropTypes.number
  })).isRequired,
  caption: PropTypes.string
}
