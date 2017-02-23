import React, { Component } from 'react'
import _ from 'lodash'
import cn from 'classnames'

export default function createPlayerDefinedAttributeComponent(options = {}) {
  if (!options.name) {
    throw new Error('A name is required in the options')
  }

  const decorator = (WrappedComponent) => {
    return class PlayerDefinedAttributeComponent extends Component {
      constructor(props) {
        super(props)
        this.regExp = this.createDiceRegex(props)
        this.state = {
          attributes: props.attributes,
          errors: []
        }
      }

      componentWillReceiveProps(nextProps) {
        this.setState({ attributes: nextProps.attributes })
      }

      createDiceRegex(props = this.props) {
        if (this.props.noDiceLimits) {
          return /(\d*)(d4|d6|d8)/
        }
        const attributeDice = props.attributeDice.slice(1)
        const dieSizes = attributeDice.reduce((accumulator, value) => {
          return `${accumulator}|${value.size}`
        }, props.attributeDice[0].size)
        return new RegExp(`(\\d*)(${dieSizes})`)
      }

      getRemainingDice() {
        if (this.props.noDiceLimits) { return '' }
        const { attributeDice, attributes } = this.props
        const diceUsed = {}
        attributes.forEach(attr => {
          const diceForSize = diceUsed[attr.dice.size]
          if (!diceForSize) {
            diceUsed[attr.dice.size] = attr.dice.number
          } else {
            diceUsed[attr.dice.size] = diceForSize + attr.dice.number
          }
        })
        let remainingDice = ''
        attributeDice.forEach(dice => {
          const totalRemaining = dice.number - (diceUsed[dice.size] || 0)
          remainingDice += `${totalRemaining}${dice.size} `
        })
        remainingDice += 'left to assign'
        return remainingDice
      }

      getDiceString(attribute) {
        if (!attribute || !attribute.dice) { return '' }
        if (typeof attribute.dice === 'string') {
          return attribute.dice
        } else if (attribute.dice instanceof Object) {
          return `${attribute.dice.number}${attribute.dice.size}`
        }
        return ''
      }

      addNewAttribute() {
        const newAttribute = { dice: { size: 'd6', number: 2 }, text: '' }
        this.props.onChange(options.name, [...this.state.attributes, newAttribute])
      }

      changeDice(index, newValue) {
        const match = this.regExp.exec(newValue)
        let errors = [...this.state.errors]
        if (match === null) {
          this.setState({
            errors: _.uniq([...errors, index])
          })
        } else {
          errors = _.filter(errors, index)
          this.setState({ errors })
          if (errors.length !== 0) { return }
          const newAttributes = [...this.state.attributes]
          const newAttribute = {
            ...newAttributes[index],
            dice: { number: parseInt(match[1], 10) || 1, size: match[2] }
          }
          newAttributes[index] = newAttribute
          this.props.onChange(options.name, newAttributes)
        }
      }

      handleAdditionalOptionChange(index, valueName, newValue) {
        const newAttributes = [...this.state.attributes]
        const newAttribute = {
          ...newAttributes[index],
          [valueName]: newValue
        }
        newAttributes[index] = newAttribute
        this.props.onChange(options.name, newAttributes)
      }

      renderAdditionalOption(index) {
        if (options.additionalOption) {
          return <options.additionalOption onChange={this.handleAdditionalOptionChange.bind(this, index)} />
        }
      }

      renderAttributes() {
        const { errors, attributes } = this.state
        return attributes.map((attr, index) => {
          return (
            <div key={index} className='row'>
              <input
                className={cn({
                  'two': true,
                  'columns': true,
                  'error': _.includes(errors, index)
                })}
                type='text'
                placeholder='2d6'
                value={this.getDiceString(attr)}
                onChange={event => {
                  let newAttributes = [...attributes]
                  newAttributes[index].dice = event.target.value
                  this.setState({ attributes: newAttributes })
                }}
                onBlur={event => {
                  this.changeDice(index, event.target.value)
                }}
              />
              <input
              className={cn({
                'eight': options.additionalOption,
                'ten': !options.additionalOption,
                'columns': true,
                'error': _.includes(errors, index)
              })}
                type='text'
                placeholder='This will get better'
                value={attr.text}
                onChange={event => {
                  let newAttributes = [...attributes]
                  newAttributes[index].text = event.target.value
                  this.props.onChange(options.name, newAttributes)
                }}
              />
              {this.renderAdditionalOption(index)}
            </div>
          )
        })
      }

      render() {
        const buttonText = options.buttonText || 'New'
        return (
          <WrappedComponent {...this.props} remainingDice={this.getRemainingDice()}>
            {this.renderAttributes()}
            <input className='button' type='button' value={buttonText} onClick={this.addNewAttribute.bind(this)} />
          </WrappedComponent>
        )
      }
    }
  }

  return decorator
}
