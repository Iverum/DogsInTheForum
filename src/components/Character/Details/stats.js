import React, { Component } from 'react'

export default class Stats extends Component {
  constructor(props) {
    super(props)
    this.statDiceSize = this.props.backgroundStats.size
    this.diceRegExp = new RegExp(`(\d*)${this.statDiceSize}`)
    this.state = {
      Acuity: props.Acuity,
      Body: props.Body,
      Heart: props.Heart,
      Will: props.Will
    }
  }

  componentWillReceiveProps(nextProps) {
    this.statDiceSize = nextProps.backgroundStats.size
    this.diceRegExp = new RegExp(`(\d*)${this.statDiceSize}`)
    this.setState({
      Acuity: nextProps.Acuity,
      Body: nextProps.Body,
      Heart: nextProps.Heart,
      Will: nextProps.Will
    })
  }

  getStatString(stat) {
    if (!stat) { return '' }
    return `${stat.number}${stat.size}`
  }

  getRemainingStatDice() {
    const backgroundStatDiceCount = this.props.backgroundStats.number
    const { Acuity, Body, Heart, Will } = this.state
    let assignedStatDice = 0
    if (Acuity) { assignedStatDice += Acuity.number }
    if (Body) { assignedStatDice += Body.number }
    if (Heart) { assignedStatDice += Heart.number }
    if (Will) { assignedStatDice += Will.number }
    const remainingStatDice = backgroundStatDiceCount - assignedStatDice
    return `${remainingStatDice}${this.statDiceSize} left to assign`
  }

  render() {

    return (
      <div className={this.props.className}>
        <h2>Stats</h2>
        <p>{this.getRemainingStatDice()}</p>
        <div className='row'>
          <label className='two columns' htmlFor='statAcuity'>Acuity</label>
          <input
            className='ten columns'
            type='text'
            placeholder='2d6'
            id='statAcuity'
            value={this.getStatString(this.state.Acuity)}
          />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statBody'>Body</label>
          <input
            className='ten columns'
            type='text'
            placeholder='2d6'
            id='statBody'
            value={this.getStatString(this.state.Body)}
          />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statHeart'>Heart</label>
          <input
            className='ten columns'
            type='text'
            placeholder='2d6'
            id='statHeart'
            value={this.getStatString(this.state.Heart)}
          />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statWill'>Will</label>
          <input
            className='ten columns'
            type='text'
            placeholder='2d6'
            id='statWill'
            value={this.getStatString(this.state.Will)}
          />
        </div>
      </div>
    )
  }
}

Stats.defaultProps = {
  className: 'six columns'
}

Stats.propTypes = {
  className: React.PropTypes.string
}
