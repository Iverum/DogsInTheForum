import React, { Component } from 'react'
import _ from 'lodash'
import cn from 'classnames'

export default class Stats extends Component {
  constructor(props) {
    super(props)
    this.statDiceSize = this.props.backgroundStats.size
    this.diceRegExp = new RegExp(`(\\d*)${this.statDiceSize}`)
    this.state = {
      Acuity: props.Acuity,
      Body: props.Body,
      Heart: props.Heart,
      Will: props.Will,
      errors: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.statDiceSize = nextProps.backgroundStats.size
    this.diceRegExp = new RegExp(`(\\d*)${this.statDiceSize}`)
    this.setState({
      Acuity: nextProps.Acuity,
      Body: nextProps.Body,
      Heart: nextProps.Heart,
      Will: nextProps.Will,
      errors: []
    })
  }

  getStatString(stat) {
    if (!stat) { return '' }
    if (typeof stat === 'string') {
      return stat
    } else if (stat instanceof Object) {
      return `${stat.number}${stat.size}`
    }
    return ''
  }

  getRemainingStatDice() {
    const backgroundStatDiceCount = this.props.backgroundStats.number
    const { Acuity, Body, Heart, Will } = this.state
    let assignedStatDice = 0
    if (Acuity instanceof Object) { assignedStatDice += Acuity.number }
    if (Body instanceof Object) { assignedStatDice += Body.number }
    if (Heart instanceof Object) { assignedStatDice += Heart.number }
    if (Will instanceof Object) { assignedStatDice += Will.number }
    const remainingStatDice = backgroundStatDiceCount - assignedStatDice
    return `${remainingStatDice}${this.statDiceSize} left to assign`
  }

  changeStat(stat, newValue) {
    const match = this.diceRegExp.exec(newValue)
    let errors = [...this.state.errors]
    if (match === null) {
      this.setState({
        errors: _.uniq([...errors, stat])
      })
    } else {
      errors = _.filter(errors, stat)
      this.setState({ errors })
      if (errors.length !== 0) { return }
      const currentStats = { ...this.state }
      delete currentStats.errors
      const newStats = {
        ...currentStats,
        [stat]: {
          number: parseInt(match[1], 10) || 1,
          size: this.statDiceSize
        }
      }
      this.props.onChange('stats', newStats)
    }
  }

  render() {
    const { errors } = this.state
    return (
      <div className={this.props.className}>
        <div className='row'>
          <h2 className='three columns'>Stats</h2>
          <aside className='nine columns'>{this.getRemainingStatDice()}</aside>
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statAcuity'>Acuity</label>
          <input
            className={cn({
              'ten columns': true,
              'error': _.includes(errors, 'Acuity')
            })}
            type='text'
            placeholder='2d6'
            id='statAcuity'
            value={this.getStatString(this.state.Acuity)}
            onChange={event => {
              this.setState({
                Acuity: event.target.value
              })
            }}
            onBlur={event => {
              this.changeStat('Acuity', event.target.value)
            }}
          />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statBody'>Body</label>
          <input
            className={cn({
              'ten columns': true,
              'error': _.includes(errors, 'Body')
            })}
            type='text'
            placeholder='2d6'
            id='statBody'
            value={this.getStatString(this.state.Body)}
            onChange={event => {
              this.setState({
                Body: event.target.value
              })
            }}
            onBlur={event => {
              this.changeStat('Body', event.target.value)
            }}
          />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statHeart'>Heart</label>
          <input
            className={cn({
              'ten columns': true,
              'error': _.includes(errors, 'Heart')
            })}
            type='text'
            placeholder='2d6'
            id='statHeart'
            value={this.getStatString(this.state.Heart)}
            onChange={event => {
              this.setState({
                Heart: event.target.value
              })
            }}
            onBlur={event => {
              this.changeStat('Heart', event.target.value)
            }}
          />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statWill'>Will</label>
          <input
            className={cn({
              'ten columns': true,
              'error': _.includes(errors, 'Will')
            })}
            type='text'
            placeholder='2d6'
            id='statWill'
            value={this.getStatString(this.state.Will)}
            onChange={event => {
              this.setState({
                Will: event.target.value
              })
            }}
            onBlur={event => {
              this.changeStat('Will', event.target.value)
            }}
          />
        </div>
      </div>
    )
  }
}

Stats.defaultProps = {
  className: 'six columns',
  Acuity: { size: 'd6', number: 2 },
  Body: { size: 'd6', number: 2 },
  Heart: { size: 'd6', number: 2 },
  Will: { size: 'd6', number: 2 }
}

const statShape = React.PropTypes.shape({
  size: React.PropTypes.oneOf(['d6']).isRequired,
  number: React.PropTypes.number.isRequired
}).isRequired

Stats.propTypes = {
  className: React.PropTypes.string,
  backgroundStats: statShape,
  onChange: React.PropTypes.func.isRequired,
  Acuity: statShape,
  Body: statShape,
  Heart: statShape,
  Will: statShape
}
