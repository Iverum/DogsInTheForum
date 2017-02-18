import React, { Component } from 'react'

export default class Stats extends Component {
  getStatString(stat) {
    if (!stat) { return '' }
    return `${stat.number}${stat.size}`
  }

  getRemainingStatDice() {
    const backgroundStatDice = this.props.background.stats[0]
    const statDiceSize = backgroundStatDice.size
    const { Acuity, Body, Heart, Will } = this.props
    let assignedStatDice = 0
    if (Acuity) { assignedStatDice += Acuity.number }
    if (Body) { assignedStatDice += Body.number }
    if (Heart) { assignedStatDice += Heart.number }
    if (Will) { assignedStatDice += Will.number }
    const remainingStatDice = backgroundStatDice.number - assignedStatDice
    return `${remainingStatDice}${statDiceSize} left to assign`
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
            value={this.getStatString(this.props.Acuity)}
          />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statBody'>Body</label>
          <input
            className='ten columns'
            type='text'
            placeholder='2d6'
            id='statBody'
            value={this.getStatString(this.props.Body)}
          />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statHeart'>Heart</label>
          <input
            className='ten columns'
            type='text'
            placeholder='2d6'
            id='statHeart'
            value={this.getStatString(this.props.Heart)}
          />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statWill'>Will</label>
          <input
            className='ten columns'
            type='text'
            placeholder='2d6'
            id='statWill'
            value={this.getStatString(this.props.Will)}
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
